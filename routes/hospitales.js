/** ruta: api/hospitales */


const { Router} = require('express');
const { getHospitales, crearHospitales, actualizarHospital, borrarHospital} = require('../controllers/hospitales');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', getHospitales);

router.post('/', 
    [
        validarJWT,
         check('nombre','Nombre es obligatorio').not().isEmpty(),
        // check('password', 'Password es obligatorio').not().isEmpty(),
        // check('email', 'Email es obligatorio').isEmail(),
        validarCampos,
    ]
    ,crearHospitales);

    router.put('/:id',
    [ 
            validarJWT,
            check('nombre','Nombre es obligatorio').not().isEmpty(),
            check('email', 'Email es obligatorio').isEmail(),
            check('role', 'Rol es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        actualizarHospital);

        router.delete('/:id',validarJWT, borrarHospital);


module.exports = router;
