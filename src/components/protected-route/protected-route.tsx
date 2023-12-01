import { useAppSelector } from "../../types/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { RootState, TProtectedRouteProps } from "../../types/types";

const Protected = ({ onlyUnAuth = false, component }: TProtectedRouteProps) => {

  const getUser = (store: RootState) => store.user.user;

  const user = useAppSelector(getUser);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    const from: string = (location.pathname === '/order') ? '/' : location.pathname
    return <Navigate to="/login" state={{ from: from }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: JSX.Element}) => (
  <Protected onlyUnAuth={true} component={component} />
);
