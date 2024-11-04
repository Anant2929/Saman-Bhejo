// sockets/socketManager.js

let sendingsocket = null;

const setSocket = (socket) => {
    sendingsocket = socket;
};

const getSocket = () => {
    return sendingsocket;
};

module.exports = { setSocket, getSocket };
