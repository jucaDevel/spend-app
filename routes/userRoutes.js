const UserController = require("../controller/userController");

module.exports = (app,upload) => {
    app.post("/api/user/create",upload.array('image', 1),UserController.registerWithImage);

    app.post("/api/user/login",UserController.login)
    app.post("/api/user/logout",UserController.logout)
};