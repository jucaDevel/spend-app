const User = require("../models/user")
const Rol = require("../models/rol")
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const jwt = require("jsonwebtoken")

module.exports = {

    async registerWithImage(req,res,next){
        try {
            const user = JSON.parse(req.body.user);
            const files = req.files //Capturo todos los archivos adjuntos en el cuerpo de la petición

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; //Nombre del archivo que se va a almacenar
                const url = await storage(files[0], pathImage) //Obtener la url del archivo
                if (url!=undefined && url!=null) {
                    console.log(`URL: ${url}`);
                    user.image = url;
                } //Valido que la ruta de la imagen no sea null
            }
            console.log(`User: ${user}`);
            const data = await User.create(user);

            await Rol.createUserRol(data.id,1);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente',
                data: data.id
            });
            
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    async login(req,res,next){
        try {
            const email = req.body.email
            const password = req.body.password

            const userBD = await User.findByEmail(email)
            if(userBD!=null){

                if(User.isPasswordMatched(password,userBD.password)){
                    const token = jwt.sign({id: userBD.id,email: userBD.email},keys.secretOrKey,{
                        //expiresIn: (60*60*24) // 1 hora;
                        //expiresIn: (60*5) //2 MINUTOS
                    }); //Linea de codigo para controlar el tiempo de sesión del Usuario en la app
    
                    const data = {
                        id:userBD.id,
                        name: userBD.name,
                        email: userBD.email,
                        password:userBD.password,
                        lastname: userBD.lastname,
                        phone: userBD.phone,
                        image: userBD.image,
                        session_token: `JWT ${token}`,
                        roles:userBD.roles
                    }
    
                    await User.updateToken(userBD.id,`JWT ${token}`)
    
                    return res.status(201).json({
                        success: true,
                        data: data,
                        message: 'Si estás registrado ¡Bienvenido!'
                    });
                }
                else{
                    return res.status(401).json({
                        success: false,
                        message: "La contraseña que digitaste es incorrecta :("
                    });
                }
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: "¡Vaya! Parece ser que no estás registrado o digitaste mal tu Usuario"
                });
            }
        } catch (error) {
            console.log(`Error:${error}`);
            return res.status(501).json({
                success: false,
                message: 'No pudimos iniciar sesión, lo sentimos',
                error: error
            })
        }
    },

    async logout(req,res,next){
        try {
            const id = req.body.id;
            await User.updateToken(id,null);
            return res.status(201).json({
                success: true,
                message: 'Sesion cerrada correctamente'
            });
            
        } catch (error) {
            console.log(`Error:${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de cerrar sesión',
                error: error
            })
        }
    }
};