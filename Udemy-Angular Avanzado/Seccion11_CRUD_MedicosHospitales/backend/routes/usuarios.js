const { Router } = require('express');
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', validarJWT, getUsuarios);

router.post(
    '/', 
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        validarCampos
    ],
    createUsuario);

router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('role', 'El role es Obligatorio').not().isEmpty(),
        validarCampos
    ], 
    updateUsuario);

router.delete(
        '/:id',
        validarJWT,
        deleteUsuario);

module.exports = router;