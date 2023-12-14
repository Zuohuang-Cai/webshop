const socketIo = require('socket.io');

function initWebSocket(server) {
    const io = socketIo(server);
    io.on('connection', (socket) => {
        let username = 'unknown';
        console.log(`socket ${socket.id} connected`);
        socket.on('userConnected', (name) => {
            username = name
            io.emit('userEntered', name);
        });
        socket.on('disconnect', () => {
            console.log(socket.id,"disconnected");
            io.emit('userLeft', username);
        });
    });
    return io;
}

module.exports = initWebSocket;
