const router = require("express").Router();
const {isAuthorized} = require("./middleware");
const dbRequestHandlers = require("./dbRequestHandlers");
const logger = require("../logger");

router.post("/createPost", isAuthorized, createPost);
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
    let posts = await dbRequestHandlers.getProjectPosts(projectRef);

    res.send(posts);

}

async function getProjectDetails(req, res){

    let projectRef = req.body.projectRef;
    let projectDetails = await dbRequestHandlers.getProjectDetails(projectRef);

    res.send(projectDetails);

}

async function getHomeFeed(req, res){

    try{

        let userId = req.body.userDetails.id
        let feed = await dbRequestHandlers.getHomeFeed(userId);

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

        let category_id = req.body.category_id;

        let rows = await dbRequestHandlers.getCategoryProjects(category_id);
        res.send(rows);

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
        let rows = await dbRequestHandlers.searchForProjects(project_name);
        res.send(rows);

    }catch(err){
        console.log(err);
        logger.error(err);
    }


}

async function createPost(req, res){

    const details = req.body;

    try{

        await dbRequestHandlers.createPost(details.post_heading, details.post_description, details.post_img_url, details.userDetails.id, details.post_for);

        res.sendStatus(200);

    }catch(err){
        logger.error(err)
    }
    

}

async function createProject(req, res){

    let {userDetails} = req.body;
    let projectDetails = req.body;
    let project_icon_url = `https://avatars.dicebear.com/api/initials/${(projectDetails.project_name).replace(/\s+/g, "")}.svg`

    try{
        
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