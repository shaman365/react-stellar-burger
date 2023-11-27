import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {

  const getUser = (store) => store.user.user;

  const user = useSelector(getUser);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    const from = (location.pathname === '/order') ? '/' : location.pathname
    return <Navigate to="/login" state={{ from: from }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);