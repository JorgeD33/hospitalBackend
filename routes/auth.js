/*
    path: 'api/login'
*/
const {login} = require('../controllers/auth');
const { Router} = require('express');
const { validarCampos } = require('../middlewares/validar-campos')
const {check} = require('express-validator')
const router = Router();

router.post('/',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login)

module.exports = router;
