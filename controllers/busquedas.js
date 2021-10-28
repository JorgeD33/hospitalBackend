/**Busquedas getTodo */
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital') 


const getTodo = async(req, res) => {
    //estados del http --> res.status(400).

    const busqueda = req.params.buscar;
    const regex = new RegExp(busqueda, 'i')

    const[usuarios, medicos, hospitales] = await Promise.all([

         Usuario.find({nombre: regex}),
         Medico.find({nombre: regex}),
        Hospital.find({nombre: regex}),
    ])


    //const hospitales = await Hospital.find().populate('usuario', 'nombre')
    res.json({
        ok: true,   
       usuarios,
       medicos,
       hospitales
    })
}

const getDocumentosColeccion = async(req, res) => {
    //estados del http --> res.status(400).

    const busqueda = req.params.buscar;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i')
    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img');
            
        break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            
        break;
        case 'hospitales':
             data = await Hospital.find({nombre: regex})
                                  .populate('usuarios', 'nombre img');
           
        
        break;
        default:
            return res.status(400).json({ok:false, msg: 'La tabla debe ser medidoc/usuarios/hospitales'});
    }

    res.json({
        ok: true,
        resultados: data
    })

}
module.exports = {
    getTodo,
    getDocumentosColeccion
}