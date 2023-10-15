const TransactionController = require("../controller/transactionController");
const passport = require('passport');

module.exports = (app) => {
    //POST
    app.post("/api/transaction/create",TransactionController.createTransaction);

    //GET
    app.get('/api/transaction/getAllTransactions/:id_user', passport.authenticate('jwt',{session:false}), TransactionController.getAllTransactions);
    app.get('/api/transaction/getSumTransactions/:id_user', passport.authenticate('jwt',{session:false}), TransactionController.getSumTransactions);
    app.get('/api/transaction/getTransactionsByType/:idUser/:idType', passport.authenticate('jwt',{session:false}), TransactionController.getTransactionsByType);
};