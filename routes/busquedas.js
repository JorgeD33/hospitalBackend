/** ruta TODO path: api/todo */

const { Router} = require('express');
const { getTodo,getDocumentosColeccion} = require('../controllers/busquedas');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/:buscar', validarJWT, getTodo);
router.get('/coleccion/:tabla/:buscar', validarJWT, getDocumentosColeccion);


module.exports = router;