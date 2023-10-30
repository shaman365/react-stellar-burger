import api from "../utils/api"
import { getValidDataList } from "../utils/utils"

const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let isConnected = false;
        let timerInstance = null;

        const { wsStart, wsOpen, wsClose, wsError, wsMessage } = wsActions;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === wsStart) {
                // объект класса WebSocket
                socket = new WebSocket(payload);
            }

            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch(wsOpen(event));
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(wsError(event.message))
                };

                // функция, которая вызывается при получении события от сервера
                socket.onmessage = event => {
                    const data = JSON.parse(event.data);

                    if (data.message === 'Invalid or missing token') {
                        api.refreshToken()
                            .then(res => {
                                localStorage.setItem("refreshToken", res.refreshToken);
                                localStorage.setItem("accessToken", res.accessToken);
                            })
                            .then(res => {
                                dispatch({
                                    type: 'HISTORY_ORDERS_WS_CONNECTION_START',
                                    payload: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken').split('Bearer ')[1]}`
                                })
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            })
                    }

                    let validData = {
                        ...data,
                        orders: getValidDataList(data.orders)
                    }
                    dispatch(wsMessage(validData))
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {

                    if (isConnected) {
                        timerInstance = setTimeout(() => {
                            dispatch(wsStart);
                        }, 3000)
                    }

                    if (event.wasClean) {
                        dispatch(wsClose('WS connect closed correctly'))
                    } else {
                        dispatch(wsClose('WS connect closed uncorrectly'))
                    }
                };
            }

            next(action);
        };
    };
};

export default socketMiddleware;