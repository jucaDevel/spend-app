const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const session = require('express-session'); //Import express session para el manejo de sesiones

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
});

//RUTAS
const users = require('./routes/userRoutes');
const categories = require("./routes/categoryRoutes")
const types = require("./routes/typeRoutes")
const transactions = require("./routes/transactionRoutes")

const port = process.env.PORT || 3000;

//Inicializando el express para poder recibir los datos de las peticiones
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(cors());
app.use(session({
    secret:'my secret',
    resave: false,
    saveUninitialized: true
})) //Uso express session dentro de la app express
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port',port);


//LLAMANDO RUTAS
users(app,upload);
categories(app)
types(app)
transactions(app)

server.listen(3000, '192.168.10.14' || 'localhost', function(){
    console.log(`Aplicación ${process.pid} iniciada en puerto ${port}`);
});

app.get('/',(req,res) => {
    res.send('Ruta Raiz del backend')
});

//ERROR HANDLER
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack)
})

module.exports = {
    app: app,
    server: server
};