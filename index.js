import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});

const app = express();

//conectar a la base de datos
db.authenticate()
    .then(()=>{
        console.log('base de datos conectada');
    })
    .catch(e=>{
        console.log(e);
    })

//Definir puerto

const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req,res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreCitio = 'Agrencia de viajes';
    return next();
})

// Agregar body parser para leer los datos de un formulario
app.use(express.urlencoded({extended: true}));

//Definir carpeta public
app.use(express.static('public'));

//Agrega router
app.use('/', router);

// Puerta y host 

const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, ()=>{
    console.log('el servidor esta funcionando');
});