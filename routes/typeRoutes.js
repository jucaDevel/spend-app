const TypeController = require("../controller/typeController")
const passport = require('passport');

module.exports = (app) =>{
    //GET
    app.get('/api/type/getTypes', passport.authenticate('jwt',{session:false}), TypeController.getTypes);
}