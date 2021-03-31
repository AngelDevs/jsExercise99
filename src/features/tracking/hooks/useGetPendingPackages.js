import { useContext, useState } from "react";
import {
  NOT_FOUND_ERROR,
  UNEXPECTED_ERROR,
} from "../../../helpers/errorHandler";
import { AuthContext } from "../../authentication/context/AuthContext";
import PendingPackage from "../entities/pendingPackage";
import trakingService from "../services/tracking";

export const useGetPendingPackages = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const getPendingPackages = async (username, password) => {
    setLoading(true);

    const response = await trakingService.getPendingPackages(
      currentUser?.fullName ?? ""
    );

    setLoading(false);

    if (response.error) {
      return { error: response.error, data: [] };
    }

    const pendingPackage = response.data[
      "responseObject"
    ].map((pendingPackage) => PendingPackage.fromJson(pendingPackage));

    return {
      data: pendingPackage,
    };
  };

  return [loading, getPendingPackages];
};
