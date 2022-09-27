//authentication routes, log in
const router = require("express").Router();
const {isUniqueUser, generateIcon } = require("./middleware");
const jwt = require('jsonwebtoken');
const path = require("path");
let connection = require('../configDB');
const dbRequestHandlers = require("./dbRequestHandlers");
(
    async () => {
        connection = await connection;
    }
)();


const logger = require('../logger');

//auth routes to top
router.get("/login", (req, res) => {
    res.sendFile(path.resolve("view/public/sign-in.html"));
})

router.get("/register", (req, res) => {
    res.sendFile(path.resolve("view/public/sign-up.html"));
});

router.post("/guestLogin", generateGuestUser, generateUserJWT);

router.get("/signout", signout);

async function signout(req, res){
    res.clearCookie("Authorization");
    res.redirect("/");
}

router.post("/login", async (req, res, next) => {

    try {

        const user = req.body;
        let userDetails = await isUserValid(user.email, user.password);

        if(userDetails.length === 0){

            res.sendStatus(403);

        }else {
            req.body = JSON.stringify(userDetails[0]);  
            next();      
        }

    }catch(err){

        logger.log(err)
        res.sendStatus(403);

    }
    

}, generateUserJWT);

router.post("/register", isUniqueUser, generateUniqueUser, generateUserJWT);

async function generateUniqueUser(req,res, next){

    try {

        let userDetails = req.body;
        userDetails.avatar_url = generateIcon("user", userDetails.username);

        //already existing username, or email

        await dbRequestHandlers.register(userDetails.fullname, userDetails.username, userDetails.email, userDetails.newPassword, userDetails.avatar_url);
        userDetails = await dbRequestHandlers.getUserDetails(userDetails.username);
        req.body = userDetails[0];
        next();

    }catch(err){

        //invalid credentials
        console.log(err)
        res.sendStatus(401);

    }

}


function generateGuestUser(req, res, next){

    req.body = {
        id: 14,
        fullname: "Honoured Guest",
        username: "honouredguest",
        email: "guest@guest.com",
        password: "guest@guest.com",
        avatar_url:"https://avatars.dicebear.com/api/micah/honouredguest.svg"
    }

    next();

}

/* async function generateRandomUser(req, res, next){

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

} */

async function isUserValid(email, password){
    
    //query the database
    let query = `
        Select *
        From users
        Where email = ? and password = ?
    `;

    try{

        const [rows, metadata] = await connection.query(
            query,
            [email, password],
            (err, results) => {
                return results;
            }
        );

        return rows;

    }catch(err){
        
        logger.error(err)
    }


}

async function generateUserJWT(req, res){

    let user = req.body;
    let token = await jwt.sign(
        user,
        process.env.JWTSECRET
    );

    // old method which didn't work : req.headers['Authorization'] = `Bearer ${token}`; 

    res.cookie("Authorization", `Bearer ${token}`);
    res.send(user);

}

// function isAuthorized(req, res, next){

//     //if req contains valid jwt token, continue else redirect user to /login
//     //inHeader? 403

//     let userToken;

//     try{
        
//         userToken = (req.cookies.Authorization).split(" ")[1];

//     }catch(err){
        
//         logger.error(err);
//         res.status(403);
//         res.redirect("/login");

//     }

//     if(userToken){

//         //isToken A valid Token
//         jwt.verify(userToken, process.env.JWTSECRET, (err, jwtPayload) => {
//             if(err){
//                 //invalid token
//                 res.Status(401);
//                 res.redirect("/login");
//                 return;
//             }else {
//                 //valid token, user may proceed
//                 req.body = jwtPayload;
//                 next();
//             }
//         })

//     }

// }

module.exports = router;
