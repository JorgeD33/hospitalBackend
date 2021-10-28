/**uploads ruta: api/upload/ */

const { Router} = require('express');
const fileUpload = require('express-fileupload');
const {cargarArchivo, retornaImagen} = require('../controllers/uploads')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();
router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, cargarArchivo);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;