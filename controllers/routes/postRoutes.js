const router = require("express").Router();
const {isAuthorized, isValidNewUser, isValidUpdatedUser, generateIcon} = require("./middleware");
const dbRequestHandlers = require("./dbRequestHandlers");
const logger = require("../logger");

const multer = require("multer");
const imageStorage = multer.memoryStorage();
const upload = multer({
    storage: imageStorage,
    fileFilter: (req, file, callback) => {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/gif"
        ){
            callback(null, true);
        }else {
            callback(null, false);
        }
    }
});

router.post("/createPost", isAuthorized, upload.single("post_image"), createPost);
router.post("/createProject",isAuthorized, isUniqueProject, createProject);
router.post("/search", searchForProjects);
router.post("/getUserFollowedProjects", isAuthorized, getUserFollowedProjects);
router.post("/getUserManagedProjects", isAuthorized, getUserManagedProjects);
router.post("/getCategories", isAuthorized, getCategories);
router.post("/getCategoryProjects", isAuthorized, getCategoryProjects);
router.post("/getAllProjects", isAuthorized, getAllProjects);
router.post("/getHomeFeed", isAuthorized, getHomeFeed);
router.post("/getProjectDetails", isAuthorized, getProjectDetails);
router.post("/getProjectPosts", isAuthorized, getProjectPosts );
router.post("/followProject", isAuthorized, followProject);
router.post("/unfollowProject", isAuthorized, unfollowProject);
router.post("/getUserPosts", isAuthorized, getUserPosts);
router.post("/updateUserProfile", isAuthorized, isValidUpdatedUser, updateUserProfile);
router.post("/getUserDetails", isAuthorized, getUserDetails);

async function getUserDetails(req, res){

    try{

        let username = req.body.username.split(":").pop();
        let userDetails = await dbRequestHandlers.getUserDetails(username);
        res.send(userDetails[0]);

    }catch(err){
        console.log(err);
        logger.log(err)
    }


}

async function updateUserProfile(req, res){

    try {
        
        let updatedProfile = req.body.updatedProfile;
        updatedProfile.avatar_url = generateIcon("user", updatedProfile.username);
        let oldUsername = req.body.userDetails.username;
        
        await dbRequestHandlers.updateUserProfile(updatedProfile.fullname, updatedProfile.username, updatedProfile.email, updatedProfile.password, updatedProfile.avatar_url, oldUsername);
        
        updatedProfile = await dbRequestHandlers.getUserDetails(updatedProfile.username);
        console.log(updatedProfile)

        res.status(200);
        res.send(updatedProfile);

    }catch(err){
        console.log(err);
        logger.log(err);
    }

}

async function getUserPosts(req, res){

    let username = req.body.username;
    let rows = await dbRequestHandlers.getUserPosts(username);

    res.send(rows);

}

async function unfollowProject(req, res){

    let userId = req.body.userDetails.id;
    let projectId = req.body.projectId;

    await dbRequestHandlers.unfollowProject(userId, projectId);

    res.sendStatus(200);

}


async function followProject(req, res){

    let userId = req.body.userDetails.id;
    let projectId = req.body.projectId;

    await dbRequestHandlers.followProject(userId, projectId)

    res.sendStatus(200);

}

async function getProjectPosts(req, res){
    
    let projectRef = req.body.projectRef;
    let userRef = req.body.userDetails.id;

    let posts = await dbRequestHandlers.getProjectPosts(projectRef);
    let isUserFollowing = await dbRequestHandlers.isUserFollowing(userRef, projectRef);

    if(isUserFollowing.length == 0){
        isUserFollowing = false;
    }else {
        isUserFollowing = true;
    }

    res.send({posts: posts, isUserFollowing: isUserFollowing});

}

async function getProjectDetails(req, res){

    let projectRef = (req.body.projectRef).split(":")[1];
    let projectDetails = await dbRequestHandlers.getProjectDetails(projectRef);
    res.send(projectDetails);

}

async function getHomeFeed(req, res){

    try{

        let userId = req.body.userDetails.id
        let feed = await dbRequestHandlers.getHomeFeed(userId);
        console.log(feed);
        res.send(feed);

    }catch(err){
        console.log(err);
        logger.log(err)
    }

}

async function getAllProjects(req, res){

    try {

        let rows = await dbRequestHandlers.getAllProjects();
        res.send(rows);

    }catch(err){
        console.log(err);
        logger.error(err);
    }

}


async function getCategoryProjects(req, res){

    try {

        let categoryProjects = [];

        let category_id = req.body.category_id;

        categoryProjects = await dbRequestHandlers.getCategoryProjects(category_id);

        res.send(categoryProjects);

    }catch(err){
        console.log(err);
        logger.error(err);
    }

}

async function getCategories(req, res){

    try {

        let rows = await dbRequestHandlers.getCategories();
        res.send(rows);

    }catch(err){
        console.log(err);
        logger.error(err);
    }

}

async function searchForProjects(req, res){

    try {

        let project_name = req.body.search;
        console.log(project_name);
        let rows = await dbRequestHandlers.searchForProjects(project_name);
        res.send(rows);

    }catch(err){
        console.log(err);
        logger.error(err);
    }


}

async function createPost(req, res){

    let img_blob = null;
    if(req.file){
        img_blob = req.file.buffer;
    }

    const details = req.body;
    console.log(req.body)

    try{

        await dbRequestHandlers.createPost(details.post_heading, details.post_description, img_blob, details.post_by, details.post_for);

        res.sendStatus(200);

    }catch(err){
        res.sendStatus(401);
        logger.error(err)
    }
    

}

async function createProject(req, res){

    let {userDetails} = req.body;
    let projectDetails = req.body;
    let project_icon_url = `https://avatars.dicebear.com/api/initials/${(projectDetails.project_name).replace(/\s+/g, "")}.svg`

    try{
        console.log(userDetails.id, projectDetails.project_name, project_icon_url, projectDetails.project_description);

        await dbRequestHandlers.createProject(userDetails.id, projectDetails.project_name, project_icon_url, projectDetails.project_description);
        let newProject = await dbRequestHandlers.searchForProjects(projectDetails.project_name);
        let newProjectId = newProject[0].id;

        projectDetails.project_categories.map(
            async (category_id) => {
                await dbRequestHandlers.createProjectCategoryRelationship(parseInt(category_id), newProjectId)
            }
        );

        res.sendStatus(200);

    }catch(err){
        res.sendStatus(401);
        console.log(err)
        logger.error(err);
    }

}

async function isUniqueProject(req, res, next){

    let details = req.body;

    try{
        
       let rows = await dbRequestHandlers.isUniqueProject(details.project_name);

        if(rows && rows.length == 0){
            //no records of an existing project
            next();
        }else{
            //project   rexists code
            res.sendStatus(403);
        }

    }catch(err){
        console.log(err);
        logger.error(err);
    }

}

async function getUserFollowedProjects(req, res){
    
    try{
            
        let userId = req.body.userDetails.id;
        let projects = await dbRequestHandlers.getUserFollowedProjects(userId);
        res.json(projects);

    }catch(err){
        console.log(err);
        logger.error(err);
    }


}

async function getUserManagedProjects(req, res){
    
    try{
            
        let userId = req.body.userDetails.id;
        let projects = await dbRequestHandlers.getUserManagedProjects(userId);
        res.json(projects);

    }catch(err){
        console.log(err);
        logger.error(err);
    }


}

module.exports = router;