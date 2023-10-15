const Category = require("../models/category")

module.exports = {


    async getCategoriesByType(req,res,next){
        try {
            const id_type = req.params.id_type
            const id_user = req.params.id_user
            console.log(`Params: ${JSON.stringify(req.params)}`);
            const data = await Category.getCategoriesByType(id_type,id_user);
            console.log(`Categories: ${JSON.stringify(data)}`);
            console.log(data.length);
            if (data.length > 0) {
                return res.status(201).json(data)   
            }
            else{
                return res.status(201).json({
                    message:'Parece que aun no tienes categorías creadas',
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                message:'Lo sentimos, no pudimos obtener las categorias',
                success: false,
                error: error
            })
        }
    },
    async createCategory(req,res,next){
        try {
            const category = req.body
            console.log(category);
            const data = await Category.create(category)

            return res.status(201).json({
                message:"Categoría creada con exito",
                success: true,
                data: data.id
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                message: "No pudimos crear la categoría, lo sentimos",
                success: false,
                error: error
            })
        }
    },
    async deleteCategories(req,res,next){
        try {
            const idCategory = req.body.idCategory
            await Category.delete(idCategory)
            return res.status(201).json({
                message:"Categoría eliminada con exito",
                success: true,
            })

        } catch (error) {
            console.log(error);
            return res.status(501).json({
                message: "No pudimos eliminar la categoría, lo sentimos",
                success: false,
                error: error
            })
        }
    }

}