const logger = require("../logger");
const app = require("express")();
const cors = require("cors");
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));
const httpServer = require("http").createServer(app);
let Server = require("socket.io").Server;
let socketServer = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
        }
    }
);

socketServer.on("connection", (socket) => {

    console.log("Connection Established, ", socket.id);

    socket.on("join-room", (senderId, recieverId) => {
        socket.join([senderId, recieverId]);
    });

    socket.on("send-room-message", (message, senderId, recieverId) => {
        let data = {
            text: message,
            socketId: socket.id
        }

        socketServer.to(senderId).to(recieverId).emit("recieving-message", data);
    })

})

httpServer.listen(3003, () => {
    console.log("Communication Port 3003 Opened Successfully");
})