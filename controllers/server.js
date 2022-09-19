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

//Until I figure out a way, just redirect them all to /
server.get("/explore", (req, res) => {res.redirect("/")})
server.get("/create-post", (req, res) => {res.redirect("/")})
server.get("/notifications", (req, res) => {res.redirect("/")})
server.get("/create-project", (req, res) => {res.redirect("/")})
server.get("/notifications", (req, res) => {res.redirect("/")})



const port = process.env.PORT || 3002;

server.listen(port, (err) => {
    if(err) logger.error(err);
    logger.info("Server Running On Port " + port);
});