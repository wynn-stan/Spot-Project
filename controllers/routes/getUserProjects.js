let connection  = require("../configDB");
const logger = require("../logger");


async function getUserProjects(userId){

    let query = `

    Select project_id, project_name
    from user_project_following 
    Inner Join projects on user_project_following.project_id = projects.id
    Where user_project_following.user_id = ?
    ;    
    
    `
    
    connection = await connection;
    let [rows, metadata] = await connection.query(
        query,
        [userId],
        (err, results) => {
            
            if(err) logger.error(err);

            return results
            
        }
    )

    return rows;


}

module.exports = getUserProjects;