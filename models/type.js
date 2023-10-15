const db = require("../config/config")

const Type = {}

Type.getTypes = () =>{
    const sql = `
        SELECT
            id,
            name,
            description,
            image
        FROM
            type 
    `;

    return db.manyOrNone(sql)
}

module.exports = Type