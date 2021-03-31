import { useState, useContext, useEffect } from "react";
import { useGetPendingPackages } from "../../features/tracking/hooks/useGetPendingPackages";
import { AuthContext } from "../../features/authentication/context/AuthContext";
import { NOT_FOUND_ERROR, UNEXPECTED_ERROR } from "../../helpers/errorHandler";
import { PendingCard } from "../../components/molecules/PendingCard/PendingCard";
import { Spinner } from "react-bootstrap";
import { loginRoute } from "../routes";
import { useHistory } from "react-router";
import { Header } from "../../components/molecules/Header/Header";

export const ProfilePage = () => {
  const { currentUser, loading: loadingUser, logout } = useContext(AuthContext);
  const history = useHistory();
  const [pendingPackages, setPendingPackages] = useState([]);
  const [loading, getPendingPackages] = useGetPendingPackages();

  useEffect(() => {
    if (loadingUser) return;
    const fetchPendingPackages = async () => {
      const response = await getPendingPackages(currentUser?.username);

      if (response == null) return;

      if (response.error === NOT_FOUND_ERROR) {
      }

      if (response.error === UNEXPECTED_ERROR) {
      }

      setPendingPackages(response.data);
    };

    fetchPendingPackages();

    return () => {};
  }, [loadingUser, currentUser?.username]);

  const handleClickLogOut = () => {
    logout();
    history.push(loginRoute);
  };

  const LoadingSpinnerScreen = () => (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner animation="grow" variant="primary" />
    </div>
  );

  return (
    <>
      <Header
        userFullName={currentUser?.fullName}
        onClick={handleClickLogOut}
      />
      <main className="d-flex flex-wrap justify-content-around ">
        {loading ? (
          <LoadingSpinnerScreen></LoadingSpinnerScreen>
        ) : (
          pendingPackages.map((pendingPackage) => (
            <div className="p-2" key={pendingPackage.description}>
              <PendingCard
                title={pendingPackage.description}
                description={pendingPackage.description}
                weight={pendingPackage.weight}
                priceToPay={pendingPackage.priceToPay}
                supplier={pendingPackage.supplier}
                courier={pendingPackage.courier}
                courierTracking={pendingPackage.courierTracking}
                internalTracking={pendingPackage.internalTracking}
              />
            </div>
          ))
        )}
      </main>
    </>
  );
};
