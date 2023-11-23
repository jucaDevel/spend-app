const TransactionController = require("../controller/transactionController");
const passport = require('passport');

module.exports = (app) => {
    //POST
    app.post("/api/transaction/create",TransactionController.createTransaction);
    app.post("/api/transaction/update",TransactionController.updateTransaction);

    //GET
    app.get('/api/transaction/getAllTransactions/:id_user', passport.authenticate('jwt',{session:false}), TransactionController.getAllTransactions);
    app.get('/api/transaction/getSumTransactions/:id_user', passport.authenticate('jwt',{session:false}), TransactionController.getSumTransactions);
    app.get('/api/transaction/getTransactionsByType/:idUser/:idType', passport.authenticate('jwt',{session:false}), TransactionController.getTransactionsByType);
    app.get('/api/transaction/getTransactionsById/:idUser/:idTrans', passport.authenticate('jwt',{session:false}), TransactionController.getTransactionsById);
    app.get('/api/transaction/getTransactionsByCategory/:idUser/:idType/:idCat', passport.authenticate('jwt',{session:false}), TransactionController.getTransactionsByCategory);
};