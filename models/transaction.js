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
            TO_CHAR(t.created_at,'DD-MM-YYYY') created_at
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

module.exports = Transaction; //Exportar el objeto User para usar las funciones en demas archivos