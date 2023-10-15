const db = require("../config/config")
const crypto = require("crypto")

const User = {}

User.create = (user) =>{
    const passwordHashed = crypto.createHash('md5').update(user.password).digest('hex'); //Hago un hash a la contraseña para encriptarla
    user.password = passwordHashed
    const sql = `
        INSERT INTO users(
            email,
            name,
            lastname,
            password,
            image,
            created_at,
            updated_at
        )
        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id
    `;

    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.password,
        user.image,
        new Date(),
        new Date()
    ]);
}

User.findByEmail = (email) =>{
    const sql = `
    SELECT
        U.id,
        U.name,
        U.lastname,
        U.email,
        U.password,
        U.session_token,
        U.image,
        json_agg(
            json_build_object(
            'id', R.id,
            'name', R.name,
            'image', R.image,
            'route', R.route
            )
        ) AS roles
    FROM
        users U
    INNER JOIN user_has_role UHR ON UHR.id_user = U.id
    INNER JOIN role R ON R.id = UHR.id_role
    WHERE
        email = $1
    GROUP BY 
        U.id `;

    return db.oneOrNone(sql,email)
    
}

User.isPasswordMatched = (userPassword,passwordHashed) =>{
    const userPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex')
    if(userPasswordHashed === passwordHashed){
        return true
    }
    return false
}

User.updateToken = (id,token) => {
    const sql = `
        UPDATE
            users
        SET 
            session_token = $2
        WHERE 
            id = $1
    `

    return db.none(sql,[
        id,
        token
    ])
}

User.findById = (id, callback) => {
    const sql = `
        SELECT
            id,
            email,
            name,
            lastname,
            image,
            password,
            session_token
        FROM
            users
        WHERE
            id = $1
    `;

    return db.oneOrNone(sql, id).then(user =>{ callback(null,user);})
}

module.exports = User; //Exportar el objeto User para usar las funciones en demas archivos