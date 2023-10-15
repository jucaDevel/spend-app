const db = require("../config/config")

const Rol = {}

Rol.createUserRol = (id_user,id_rol) => {
    const sql = `
        INSERT INTO user_has_role(
            id_user,
            id_role,
            created_at,
            updated_at
        )
        VALUES(
            $1,$2,$3,$4
        )
    `;

    return db.none(sql,[
        id_user,
        id_rol,
        new Date(),
        new Date()
    ])
}

module.exports = Rol;