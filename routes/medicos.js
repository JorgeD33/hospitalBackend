/**Medicos path : api/medicos */const { Router} = require('express');
const { getMedicos, crearMedicos, actualizarMedico, borrarMedico} = require('../controllers/medicos');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', getMedicos);

router.post('/', 
    [
        validarJWT,
        check('nombre','Nombre es obligatorio').not().isEmpty(),
        check('hospital', 'Hospital Id debe ser valido').isMongoId(),
        validarCampos,
    ]
    ,crearMedicos);

    router.put('/:id',
    [ 
            validarJWT,
            check('nombre','Nombre es obligatorio').not().isEmpty(),
            check('email', 'Email es obligatorio').isEmail(),
            check('role', 'Rol es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        actualizarMedico);

        router.delete('/:id',validarJWT, borrarMedico);


module.exports = router;
