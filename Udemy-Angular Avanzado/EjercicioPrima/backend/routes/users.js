const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', validarJWT, getUsers);

router.post(
    '/', 
    [
        check('name', 'El nombre del usuario es obligatorio').not().isEmpty(),
        check('password', 'El password del usuario es obligatorio').not().isEmpty(),
        check('email', 'El email del usuario es obligatorio').isEmail(),
        validarCampos
    ],
    createUser);

router.put(
    '/:id', 
    [
        validarJWT,
        check('name', 'El nombre del usuario es obligatorio').not().isEmpty(),
        check('email', 'El email del usuario es obligatorio').isEmail(),
        check('role', 'El role del usuario es obligatorio').not().isEmpty(),
        check('status', 'El estado del usuario es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    updateUser);

router.delete(
        '/:id',
        validarJWT,
        deleteUser);

module.exports = router;