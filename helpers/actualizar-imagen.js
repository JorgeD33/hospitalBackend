const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')


const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        //se borra la imagen anterior
        fs.unlinkSync(path);
    }
}
const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            console.log(medico)
            if(!medico){
                console.log('medico no existe')
                return false; 
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            console.log(medico)
            await medico.save();
            return true;

        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            console.log(hospital)
            if(!hospital){
                console.log('hospital no existe')
                return false; 
            }

           pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            console.log(hospital)
            await hospital.save();
            return true;
        
           break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            console.log(usuario)
            if(!usuario){
                console.log('usuario no existe')
                return false; 
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            console.log(usuario)
            await usuario.save();
            return true;
        
            break;
        
        default:
            break;
    }
}


module.exports = {
    actualizarImagen
}