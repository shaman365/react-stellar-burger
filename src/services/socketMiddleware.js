import api from "../utils/api"

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
                console.log ('socket.wsStart: socketL ', socket)
            }
            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    console.log ('socket.onopen: ', event)
                    dispatch(wsOpen(event));
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    console.log ('socket.onerror: ', event)
                    dispatch(wsError(event.message))
                };

                // функция, которая вызывается при получении события от сервера
                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    console.log ('socket.onmessage: ', data)

                    if (data.message === 'Invalid or missing token') {
                        api.refreshToken()
                            .then(res => {
                                localStorage.setItem("refreshToken", res.refreshToken);
                                localStorage.setItem("accessToken", res.accessToken);
                            })
                            .then(res => {
                                //todo
                                console.log("some logic here");
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            })
                    }

                    //todo
                    //validate data before dispatch
                    
                    dispatch(wsMessage(data));
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