const CategoryController = require("../controller/categoryController")
const passport = require('passport');

module.exports = (app) =>{
    //POST
    app.post("/api/category/create",passport.authenticate('jwt',{session:false}),CategoryController.createCategory)
    app.post("/api/category/delete",passport.authenticate('jwt',{session:false}),CategoryController.deleteCategories)

    //GET
    app.get('/api/category/getCategoriesByType/:id_type/:id_user', passport.authenticate('jwt',{session:false}), CategoryController.getCategoriesByType);
}