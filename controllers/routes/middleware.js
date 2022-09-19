const jwt = require("jsonwebtoken");
const logger = require("../logger");

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

module.exports = {
    isAuthorized: isAuthorized,
    generateUserJWT: generateUserJWT
}