let connection = require('../configDB').connection;
const logger = require('../logger');


async function getPosts(userId){

    /**
     * make a database request for this data, latest posts based on who you're following.
     *   latest posts based on who you're following. 
     *      get userid
     *          get projects that user is following
     *              create a new table which would have the project_name and latest post, get the next 100 the first 100;
     * if none, latest posts in the world with most upvotes
     * 
     */

    let query = `
        
    Select user_project_following.user_id, user_project_following.project_id, projects.project_name, posts.id As post_id, users.first_name As post_by, posts.heading, posts.description, post_image, posts.post_time
    From user_project_following, projects, posts
    inner Join users on users.id = posts.post_by
    Where user_id = ? and projects.id = user_project_following.project_id and user_project_following.project_id = posts.post_for
    ORDER BY posts.post_time DESC
    `;



    try {


        connection = await connection;
        let [rows, metadata] = await connection.query(
            query,
            [userId],
            (err, results) => {
                if(err) logger.error(err);
                return results;
            }
        );

            rows = JSON.stringify(rows);
            return rows;

    }catch(err){
        logger.error(err);
    }
    

}

module.exports = getPosts;