const db = require("../config/config")

const Category = {}

Category.create = (category) => {
    const sql = `
        INSERT INTO category (
            name,
            description,
            id_type,
            id_user,
            created_at,
            updated_at
        )
        VALUES(
            $1,$2,$3,$4,$5,$6
        ) RETURNING id
    `
    return db.oneOrNone(sql,[
        category.name,
        category.description,
        category.idType,
        category.idUser,
        new Date(),
        new Date()
    ])
}

Category.getCategoriesByType = (idType,idUser) =>{
    const sql = `
        SELECT
            id,
            name,
            description,
            id_type,
            id_user
        FROM
            category
        WHERE
            id_type = $1 
        AND
            id_user = $2 
    `;

    return db.manyOrNone(sql,[
        idType,
        idUser
    ])
}

Category.delete = (idCategory) => {
    const sql = `
        DELETE
        FROM
        category
        WHERE id = $1
    `;
    return db.none(sql,idCategory);
}

module.exports = Category