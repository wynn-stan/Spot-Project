let logger = require("../logger");
let connection = require("../configDB");
(
    async () => {
        connection = await connection;
    }
)();

async function search(req, res){

    connection = await connection;

    //items which start with the ssearch Item
    let searchItem = req.body.search;

    //query the database
    let query = `
        Select project_name
        From projects
        Where project_name Like ?;
    `;

    try {

        let [rows, metadata] = await connection.query(
            query,
            [searchItem + '%'],
            (err, results) => {
                if(err) logger.error(err);
                return results;
            }
        );

        rows = JSON.stringify(rows);
        res.send(rows);

    }catch(err){
        logger.error(err);
    }
    

}

module.exports = search;