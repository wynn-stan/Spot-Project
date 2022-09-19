const router = require("express").Router();
const path = require("path");
const logger = require("../logger");
const { isAuthorized } = require("./middleware");
const dbRequestHandlers = require("./dbRequestHandlers");

router.get("/", isAuthorized, (req, res) => {
    
    res.sendFile(path.resolve("view/public/index.html"));

});

router.get("/getHomeFeed", isAuthorized, getHomeFeed);

async function getHomeFeed(req, res){

    try {

        let userId = req.body.id;
        let posts = await dbRequestHandlers.getHomeFeed(userId);
        
        res.status(200);
        res.send(posts);

    }catch(err){
        
        console.log(err);
        logger.error(err)

    }


}


module.exports = router;