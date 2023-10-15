const Type = require("../models/type")

module.exports = {


    async getTypes(req,res,next){
        try {
            const types = await Type.getTypes()
            console.log(`Tipos: ${JSON.stringify(types)}`);
            return res.status(201).json(types)
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                message:'Lo sentimos, no pudimos obtener los tipos',
                success: false,
                error: error
            })
        }
    },

}