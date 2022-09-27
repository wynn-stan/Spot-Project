const jwt = require("jsonwebtoken");
const logger = require("../logger");
const dbRequestHandlers = require("./dbRequestHandlers");

function isAuthorized(req, res, next){

    //if req contains valid jwt token, continue else redirect user to /login
    //inHeader? 403
    let userToken;

    try{
        
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
                req.body.userDetails = jwtPayload;
                next();
            }
        })

    }

}

async function generateUserJWT(req, res){

    let user = req.body;
    console.log(user);
    let token = await jwt.sign(
        user,
        process.env.JWTSECRET
    );

    // req.headers['Authorization'] = `Bearer ${token}`; 

    res.cookie("Authorization", `Bearer ${token}`);
    res.redirect("/");

}

async function isUniqueUser(req, res, next){

    try {
        let {username, email} = req.body.updatedProfile;

        let oldUsername = req.body.userDetails.username;
        let oldEmail = req.body.userDetails.email;

        
        let results = await dbRequestHandlers.isUniqueUser(username, email);

        if(results.length == 0){
            //info provided is unique and not in the database
            next();
        }else if(results[0].email == oldEmail || results[0].username == oldUsername){
            next();
        }
        else{
            //send and already exists status code
            res.sendStatus(403);
        }
    }catch(err){
        console.log(err);
        logger.error(err);
    }


}

function generateIcon(type, seed){
    if(type == "project"){
        return `https://avatars.dicebear.com/api/initials/${(seed).replace(/\s+/g, "")}.svg`
    }

    if(type == "user"){
        return `https://avatars.dicebear.com/api/micah/${(seed).replace(/\s+/g, "")}.svg`

    }
}


module.exports = {
    isAuthorized: isAuthorized,
    generateUserJWT: generateUserJWT,
    isUniqueUser: isUniqueUser, 
    generateIcon: generateIcon
}