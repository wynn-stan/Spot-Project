const logger = require("./logger");
const http = require("http");
const app = require("express")();
let socketIO = require("socket.io").Server;
let httpServer = http.createServer(app);
let socketServer = new socketIO(httpServer);


socketServer.on("connection", (socket) => {
    console.log("A user has connected");
    console.log(socket);
});

httpServer.listen(3005, () => {
    console.log("Communication Port Opened Successfully");
})