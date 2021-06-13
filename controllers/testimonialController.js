import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async(req, res)=>{
    //VALIDAR

    const {nombre,email,mensaje} = req.body;

    const errores=[];

    console.log(nombre,email,mensaje)

    if (nombre.trim() === ''){
        errores.push({mensaje: 'El nombre esta vacio'})
    }

    if(email.trim() === ''){
        errores.push({mensaje: 'El correo esta vacio'})
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje esta vacio'})
    }

    if(errores.length > 0 ){
        //Mostrar vista con erroes

        //Consultar testimoniales
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else{
        //Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            })
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }

}

export {
    guardarTestimonial
}