import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    console.log('~~~~~~~~~~~~ 1');

    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('~~~~~~~~~~~~ 2');
    const from = (location.pathname === '/order') ? '/' : location.pathname
    return <Navigate to="/login" state={{ from: from }} />;
  }

  console.log('~~~~~~~~~~~~ 3');
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
