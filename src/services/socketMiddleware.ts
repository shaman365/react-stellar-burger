import api from "../utils/api"
import { getValidDataList } from "../utils/utils"
import { TWSConfig, RootState } from "../types/types"
import { Middleware } from "redux";

const socketMiddleware = (wsActions: TWSConfig): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;
        let isConnected = false;

        const { wsStart, wsOpen, wsClose, wsError, wsMessage } = wsActions;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === wsStart) {
                // объект класса WebSocket
                socket = new WebSocket(payload);
            }

            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch(wsOpen(event.type));
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(wsError("Ошибка"))
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
                                const accessToken = localStorage.getItem('accessToken')
                                dispatch({
                                    type: 'HISTORY_ORDERS_WS_CONNECTION_START',
                                    payload: `wss://norma.nomoreparties.space/orders?token=${accessToken ? accessToken.split('Bearer ')[1] : ''}`
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
                        window.setTimeout(() => {
                            dispatch({type: wsStart});
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