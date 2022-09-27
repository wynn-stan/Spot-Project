require('dotenv').config();
const express = require('express');
const server = express();
const authenticationRoutes = require('./routes/authenticationRoutes');
const postRoutes = require("./routes/postRoutes");
const getRoutes = require("./routes/getRoutes");
const logger = require('./logger');
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require('cookie-parser');

//set up cors
const cors = require('cors')
let corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
	methods: "GET, POST"
}

server.use(cookieParser());
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: true
}));

//serve static public files to /public
server.use("/public", express.static(path.resolve("view/public/")));
server.use("/public/svgs", express.static(path.resolve("view/public/svgs")));

//handle requests to fetch user posts
server.use(authenticationRoutes);
server.use(postRoutes);
server.use(getRoutes);



const port = process.env.PORT || 3002;

server.listen(port, (err) => {
    if(err) logger.error(err);
    logger.info("Server Running On Port " + port);
});

module.exports = server;
