// RUTA = /api/usuarios
const { Router} = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', 
    [
        check('nombre','Nombre es obligatorio').not().isEmpty(),
        check('password', 'Password es obligatorio').not().isEmpty(),
        check('email', 'Email es obligatorio').isEmail(),
        validarCampos,
    ]
    ,crearUsuarios);

    router.put('/:id',
    [ 
            validarJWT,
            check('nombre','Nombre es obligatorio').not().isEmpty(),
            check('email', 'Email es obligatorio').isEmail(),
            check('role', 'Rol es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        actualizarUsuario);

        router.delete('/:id',validarJWT, borrarUsuario);


module.exports = router;
