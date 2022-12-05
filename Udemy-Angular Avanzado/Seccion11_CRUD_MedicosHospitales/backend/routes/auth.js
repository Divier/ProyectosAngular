const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Rutas
router.post(
    '/',
    [
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);

module.exports = router;