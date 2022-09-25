let connection = require("../configDB");
(
    async () => {
        connection = await connection;
    }
)();

const logger = require("../logger");

async function login(user_email, user_password){

    let query = `

    Select * from users 
    Where users.email = ? and users.password = ?;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [user_email, user_password],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function register(fullname, username, email, password, avatar_url){

    let query = `

    insert into users(fullname, username, email, password, avatar_url)
    values(? , ?, ?, ?, ?);
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [fullname, username, email, password, avatar_url],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){
        console.log(err)
        logger.error(err);

    }


}

async function guestLogin(){

    let query = `

    Select * 
    from users 
    where users.email = "guest@guestlogin.com" and users.password = "guestPassword";    
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function createPost(post_heading, post_description, post_img_url, post_by, post_for){

    let query = `

    insert into posts
    (post_heading, post_description, post_date, post_time, post_img_url, post_by, post_for)
    values
    (?, ?, current_date(), current_time(), ?, ?, ?);
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [post_heading, post_description, post_img_url, post_by, post_for],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function createProject(user_id, project_name, project_icon_url, project_description){

    let query = `

    insert into projects
    (name, avatar_url, project_description, managed_by)
    values (? , ?, ?, ?);
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [project_name, project_icon_url, project_description, user_id],
            (err, results) => {

                return results;
    
            }
        );

        return rows;

    }catch(err){

        console.log(err)
        logger.error(err);

    }


}

async function followProject(user_id, project_id){

    let query = `

    insert into user_project_following(
        user_id, project_id
    )
    values(?, ?);
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [user_id, project_id],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function unfollowProject(user_id, project_id){

    let query = `

    delete from user_project_following
    where user_id = ? and project_id = ?;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [user_id, project_id],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function updateUserProfile(fullname, username, email, password, avatar_url){

    let query = `

    update users
    set fullname = ?, email = ?, password = ?, avatar_url = ?
    where users.id = ?;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [fullname, username, email, password, avatar_url],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function getCategoryProjects(category_id){

    let query = `

    select id, name, avatar_url
    from projects
    inner join project_category_relationship on project_category_relationship.project_id = projects.id
    where project_category_relationship.category_id = ?;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [category_id],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function getHomeFeed(user_id){

    /** Query1 check again
     * 	Select posts.id, posts.post_heading, posts.post_description, posts.post_date, posts.post_time, posts.post_by, posts.post_for, users.username As username, projects.name As project_name
    from user_project_following
    inner join projects on projects.id = user_project_following.project_id
    inner join posts on posts.post_for = projects.id
        inner join users on users.id = posts.post_by
    where user_project_following.user_id = ?
    ORDER BY posts.post_date, posts.post_time DESC;
     */

    let query = `

	select posts.id as post_id, post_heading, post_description, post_date, post_time, post_img_url, post_by, post_for, users.username as username, projects.id as project_id, projects.name as project_name, projects.avatar_url as project_avatar_url, project_description
    from posts
    inner join projects on projects.id = posts.post_for
    inner join users on posts.post_by = users.id
    where projects.managed_by = ?
    
    union
    
	select posts.id as post_id, post_heading, post_description, post_date, post_time, post_img_url, post_by, post_for,  users.username as username, projects.id as project_id, projects.name as project_name, projects.avatar_url as project_avatar_url, project_description
    from user_project_following
    inner join projects on projects.id = user_project_following.project_id
    inner join posts on posts.post_for = projects.id
    inner join users on users.id = posts.post_by
    where user_project_following.user_id = ?
    
    ORDER BY post_date DESC, post_time DESC;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [user_id, user_id],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function getUserFollowedProjects(user_id){

    let query = `

    Select id, name, avatar_url
    from projects inner join user_project_following on user_project_following.project_id = projects.id
    where user_project_following.user_id = ?;    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [user_id],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function getUserManagedProjects(user_id){

    let query = `

    Select projects.id, projects.name, projects.avatar_url
    from projects
    where projects.managed_by = ?;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [user_id],
            (err, results) => {

                console.log(results);
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }
}

async function searchForProjects(project_name){

    let query = `

    Select *
    from projects
    Where name Like ?;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [project_name + "%"],
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}


async function getChatRoomMessages(){

    let query = `

    Select *
    from chatroom_messages
    order by message_date, message_time desc
    Limit 100;
    
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            (err, results) => {
    
                return results;
    
            }
        )
    
        return rows;

    }catch(err){

        logger.error(err);

    }


}

async function isUniqueUser(username, email){

    let query = `
        Select * 
        From Users 
        Where username = ? or email = ?;
    `

    try {
       
        const [rows, metadata] = await connection.query(
            query,
            [username, email],
            (err, results) => {
                return results
            }
        )

        return rows;

    }catch(err){
        logger.error(err);
    }

}

async function isUniqueProject(project_name){

    let query = `
        Select * 
        From projects 
        Where name = ?;
    `

    try {
    
        const [rows, metadata] = await connection.query(
            query,
            [project_name],
            (err, results) => {
                return results
            }
        )

        return rows;

    }catch(err){
        console.log(err)
        logger.error(err);
    }

}

async function getCategories(){
    try {
            let query = `
            Select * From categories;
        `;

        let [rows, metadata] = await connection.query(
            query,
            [],
            (err, results) => {
                return results
            }
        );

        return rows;

    }catch(err){
        console.log(err)
        logger.error(err)
    }
}

async function createProjectCategoryRelationship(category_id, project_id){

    try {

        let query = `
            INSERT INTO project_category_relationship(category_id, project_id)
            values(?, ?);
        `;

        await connection.query(
            query,
            [category_id, project_id]
        );

    }catch(err){
        console.log(err);
        logger.error(err)
    }

}

async function getAllProjects(){

    try{

        let query =
        `
            Select * From projects;
        `;

        let [rows, results] = await connection.query(
            query,
            [],
            (err, results) => {
                return results;
            }
        );

        return rows;


    }catch(err){

        console.log(err);
        logger.error(err);

    }

}

async function getProjectDetails(project_name){

    try{

        let query =
        `
            Select * From projects
            where projects.name = ?
            ;
        `;

        let [rows, results] = await connection.query(
            query,
            [project_name],
            (err, results) => {
                return results;
            }
        );

        return rows;


    }catch(err){

        console.log(err);
        logger.error(err);

    }

}

async function getProjectPosts(projectRef){

    try{

        let query =
        `
        select posts.id as post_id, post_heading, post_description, post_date, post_time, post_img_url, post_by, post_for, projects.name as project_name, projects.avatar_url as project_avatar_url
        from posts
        inner join projects on posts.post_for = projects.id
        inner join users on users.id = posts.post_by
        where projects.id = ?
        order by post_date, post_time DESC;
            ;
        `;

        let [rows, results] = await connection.query(
            query,
            [projectRef],
            (err, results) => {
                return results;
            }
        );

        return rows;


    }catch(err){

        console.log(err);
        logger.error(err);

    }

}

async function getProjectCategories(projectId){
    try{

        let query =
        `
        select * 
        from categories
        inner join project_category_relationship on categories.id = project_category_relationship.category_id
        where project_category_relationship.project_id = ?
        ;
        `;

        let [rows, metadata] = await connection.query(
            query,
            [projectId],
            (err, results) => {
                return results;
            }
        );

        return rows;


    }catch(err){

        console.log(err);
        logger.error(err);

    }
   
}

async function getUserDetails(username){

    try{

        let query =
        `
        select * 
        from users
        where username = ?;
        ;
        `;

        let [rows, metadata] = await connection.query(
            query,
            [username],
            (err, results) => {
                return results;
            }
        );

        return rows;


    }catch(err){

        console.log(err);
        logger.error(err);

    }

}

module.exports = {
    getUserDetails: getUserDetails,
    getProjectCategories: getProjectCategories,
    getProjectPosts: getProjectPosts,
    getProjectDetails: getProjectDetails,
    getCategories: getCategories,
    getCategoryProjects: getCategoryProjects,
    getAllProjects: getAllProjects,
    getChatRoomMessages: getChatRoomMessages,
    getHomeFeed: getHomeFeed,
    getUserFollowedProjects: getUserFollowedProjects,
    getUserManagedProjects: getUserManagedProjects,
    guestLogin: guestLogin,
    login: login,
    unfollowProject: unfollowProject,
    updateUserProfile: updateUserProfile,
    followProject: followProject,
    createPost: createPost,
    createProject: createProject,
    createProjectCategoryRelationship: createProjectCategoryRelationship,
    register: register,
    searchForProjects: searchForProjects,
    isUniqueProject: isUniqueProject,
    isUniqueUser: isUniqueUser
}