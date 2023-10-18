import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)

  const user = useSelector((store) => store.user.user);

  const store = useSelector(store => store);
  console.log(store);

  console.log('Protected isAuthChecked: ', isAuthChecked);
  console.log('Protected user: ', user);
  console.log('onlyUnAuth: ', onlyUnAuth)

  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    console.log('!isAuthChecked запрос еще выполняется... return null');

    return null;
  }

  if (onlyUnAuth && user) {
    console.log('onlyUnAuth && user');

    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };

    console.log('onlyUnAuth && user from: ', from);

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('!onlyUnAuth && !user');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  console.log('!onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя');

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
