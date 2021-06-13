import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimoniales.js';

const paginaInicio = async(req, res)=>{ // req - lo que enviamos - res- lo que devolvemos

    //Consultar 3 viajes del modelo viaje
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}))

    try {
        const resultado = await Promise.all(promiseDB);

        const [viajes,testimoniales] = resultado;

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes,
            testimoniales
        });
        
    } catch (error) {
        console.log(error)
    }

    
    
}

const paginaNosotros = (req, res)=>{ // req - lo que enviamos - res- lo que devolvemos
    
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res)=>{ // req - lo que enviamos - res- lo que devolvemos
    //Consultar Base de datos
    const viajes = await Viaje.findAll();
    
    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes
    });
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res)=>{
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where : {slug}});

        res.render('viaje',{
            pagina: 'Informacion Viaje',
            viaje
        })

    } catch (error) {
        console.log(error);
    }
}

const paginaTestimoniales = async (req, res)=>{ 

    try {
        const testimoniales = await Testimonial.findAll();
        
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }
    
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}