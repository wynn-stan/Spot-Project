const express = require('express');
const router = express.Router();
const getHomePosts = require('./getPosts');
const search = require('./search');
const jwt = require('jsonwebtoken');
const path = require("path");
let { connection } = require('../configDB');
(async () => {connection = await connection})();
const getPosts = require("./getPosts");

const logger = require('../logger');

router.get("/getHomePosts", (req, res) => {getHomePosts(req, res, 20)});
router.post("/search", search);

router.get("/login", (req, res) => {
    res.sendFile(path.resolve("view/public/sign-in.html"));
})

router.get("/register", (req, res) => {
    res.sendFile(path.resolve("view/public/sign-up.html"));
})

router.get("/", isAuthorized, (req, res) => {
    
    res.sendFile(path.resolve("view/public/index.html"));

});

router.post("/fetchDBPosts", isAuthorized, async (req, res) => {

    let userId = req.body.id;
    let posts = await getPosts(userId);
    res.json(posts);
    
})

router.post("/guestLogin", generateRandomUser, generateUserJWT);

router.post("/login", async (req, res, next) => {

    try {

        const user = req.body;
        let userDetails = await isUserValid(user.email, user.password);

        if(Object.keys(userDetails) === 0 || userDetails === false){

            res.sendStatus(400);
        }else {
            req.body = JSON.stringify(userDetails);  
            next();      
        }

    }catch(err){

        logger.error(err);
        res.sendStatus(400);

    }
    

}, generateUserJWT);

router.post("/register", (req,res) => {

    try {

        

        // const user = req.body;
        // createUser(user);

    }catch(err){

        //invalid credentials
        res.sendStatus(401);

    }

}, generateUserJWT);

async function generateRandomUser(req, res, next){

    let query = `
        Select *
        FROM users
        ORDER BY RAND()
        LIMIT 1
    `;

    let [rows, metadata] = await connection.execute(
        query,
        [], 
        (err, results) => {

            if(err) logger.error(err);
            
            return results;

        }
    )    

    req.body = rows[0];
    next();

}

async function isUserValid(email, password){
    //query the database
    let query = `
        Select *
        From users
        Where email = ? and password = ?
    `;

    const [rows, metadata] = await connection.query(
        query,
        [email, password],
        (err, results) => {
            if(err) return false;
            return results;
        }
    );

    return rows[0];
}

async function generateUserJWT(req, res){

    let user = req.body;
    let token = await jwt.sign(
        user,
        process.env.JWTSECRET
    );

    // req.headers['Authorization'] = `Bearer ${token}`; 

    res.cookie("Authorization", `Bearer ${token}`);
    res.redirect("/");

}

function isAuthorized(req, res, next){

    //if req contains valid jwt token, continue else redirect user to /login
    //inHeader? 403

    let userToken;

    try{
        
        console.log(req.cookies)
        userToken = (req.cookies.Authorization).split(" ")[1];

    }catch(err){
        
        logger.error(err);
        res.status(403);
        res.redirect("/login");

    }

    if(userToken){

        //isToken A valid Token
        jwt.verify(userToken, process.env.JWTSECRET, (err, jwtPayload) => {
            if(err){
                //invalid token
                res.Status(401);
                res.redirect("/login");
                return;
            }else {
                //valid token, user may proceed
                req.body = jwtPayload;
                next();
            }
        })

    }

}



module.exports = router;