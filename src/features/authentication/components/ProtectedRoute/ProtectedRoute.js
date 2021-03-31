import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  redirectRoute,
  isValid,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isValid ? <Component {...props} /> : <Redirect to={redirectRoute} />
      }
    />
  );
};
