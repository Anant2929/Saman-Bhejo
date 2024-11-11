// sockets/socketManager.js

let socket = null;
let io = null

const setSocket = (s,i) => {
    
    socket = s;
    io = i;
};

const getSocket = () => {
    return {socket,io};
};

module.exports = { setSocket, getSocket };
