const db = require("../config/config")
const crypto = require("crypto")

const Transaction = {}

Transaction.create = (transaction) =>{
    const sql = `
        INSERT INTO transaction(
            name,
            price,
            id_category,
            id_type,
            id_user,
            created_at
        )
        VALUES($1,$2,$3,$4,$5,$6) RETURNING id
    `;

    return db.oneOrNone(sql,[
        transaction.name,
        transaction.price,
        transaction.id_category,
        transaction.id_type,
        transaction.id_user,
        new Date()
    ]);
}

Transaction.getAllTransactions = (idUser) =>{
    const sql = `
    SELECT 
        t.name name_transaction,
        t.price,
        t.id_category,
        t.id_type,
        c.name name_category,
        ty.name name_type
    FROM transaction t
    INNER JOIN category c on c.id = t.id_category
    INNER JOIN type ty on ty.id = t.id_type
    WHERE 
        EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND
        t.id_user = $1
    ;
    `;

    return db.manyOrNone(sql,idUser)
}

Transaction.getSumTransactions = (idUser) =>{
    const sql = `
    SELECT 
        SUM(t.price) as price,
        t.id_type
    FROM transaction t
    WHERE 
        EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND
        t.id_user = $1
	GROUP BY t.id_type;
    ;
    `;

    return db.manyOrNone(sql,idUser)
}

Transaction.getTransactionByType = (idUser,idType) =>{
    const sql = `
        SELECT 
            t.name,
            t.price,
            t.id_category,
            t.id_type,
            TO_CHAR(t.created_at,'DD-MM-YYYY') created_at,
            t.id,
            t.id_user
        FROM transaction t
        INNER JOIN category c on c.id = t.id_category
        INNER JOIN type ty on ty.id = t.id_type
        WHERE 
            EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND
            t.id_user = $1
        AND
            t.id_type = $2
        ;
    `;

    return db.manyOrNone(sql,[
        idUser,
        idType
    ])
}

Transaction.getTransactionById = (idUser,idTrans) =>{
    const sql = `
        SELECT 
            t.name,
            t.price,
            t.id_category,
            t.id_type,
            TO_CHAR(t.created_at,'DD-MM-YYYY') created_at,
            t.id,
            t.id_user
        FROM transaction t
        INNER JOIN category c on c.id = t.id_category
        INNER JOIN type ty on ty.id = t.id_type
        WHERE 
            EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND
            t.id_user = $1
        AND
            t.id = $2
        ;
    `;

    return db.manyOrNone(sql,[
        idUser,
        idTrans
    ])
}

Transaction.getTransactionByCategory = (idUser,idType,idCat) =>{
    const sql = `
        SELECT 
            t.name,
            t.price,
            t.id_category,
            t.id_type,
            TO_CHAR(t.created_at,'DD-MM-YYYY') created_at,
            t.id,
            t.id_user
        FROM transaction t
        INNER JOIN category c on c.id = t.id_category
        INNER JOIN type ty on ty.id = t.id_type
        WHERE 
            EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND
            t.id_user = $1
        AND
            t.id_type = $2
        AND
            t.id_category = $3
        ;
    `;

    return db.manyOrNone(sql,[
        idUser,
        idType,
        idCat
    ])
}

Transaction.update = (transaction) =>{
    const sql = `
        UPDATE 
            transaction
        SET
            name = $2,
            price = $3,
            id_category = $4
        WHERE
            id = $1
        
    `;

    return db.none(sql,[
        transaction.id,
        transaction.name,
        transaction.price,
        transaction.id_category,
    ]);
}

module.exports = Transaction; //Exportar el objeto User para usar las funciones en demas archivos