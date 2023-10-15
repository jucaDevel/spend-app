const Transaction = require("../models/transaction")
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const jwt = require("jsonwebtoken")

module.exports = {

    async createTransaction(req,res,next){
        try {
            const transaction = req.body;
            console.log(transaction);
            const data = await Transaction.create(transaction);

            return res.status(201).json({
                success: true,
                message: 'El movimiento ha sido realizado de manera exitosa',
                data: data.id
            });
            
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del movimiento',
                error: error
            });
        }
    },

    async getAllTransactions(req,res,next){
        try {
            const idUser = req.params.id_user;
            const data = await Transaction.getAllTransactions(idUser)
            console.log(`Transactions: ${JSON.stringify(data)}`);
            if (data.length > 0) {
                return res.status(201).json(data)      
            }
            else{
                return res.status(201).json({
                    message: 'Parece ser que no tienes transacciones hechas',
                    success: false
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las categorias',
                error: error,
                success: false
            })
        }
    },

    async getSumTransactions(req,res,next){
        try {
            const idUser = req.params.id_user;
            const data = await Transaction.getSumTransactions(idUser)
            console.log(`Transactions: ${JSON.stringify(data)}`);
            if (data.length > 0) {
                return res.status(201).json(data)      
            }
            else{
                return res.status(201).json({
                    message: 'Parece ser que no tienes transacciones hechas',
                    success: false
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las categorias',
                error: error,
                success: false
            })
        }
    },

    async getTransactionsByType(req,res,next){
        try {
            const idUser = req.params.idUser;
            const idType = req.params.idType;
            const data = await Transaction.getTransactionByType(idUser,idType)
            console.log(`Transactions: ${JSON.stringify(data)}`);
            if (data.length > 0) {
                return res.status(201).json(data)      
            }
            else{
                return res.status(201).json({
                    message: 'Parece ser que no tienes transacciones hechas',
                    success: false
                })
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las categorias',
                error: error,
                success: false
            })
        }
    }
};