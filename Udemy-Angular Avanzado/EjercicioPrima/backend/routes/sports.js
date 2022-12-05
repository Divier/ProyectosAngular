const { Router } = require('express');
const { getSports, createSport, updateSport } = require('../controllers/sports');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', getSports);

router.post(
    '/', 
    [
        validarJWT,
        check('name', 'El nombre del deporte es necesario').not().isEmpty(),
        validarCampos
    ],
    createSport);

router.put(
    '/:id', 
    [
        validarJWT,
        check('name', 'El nombre del deporte es necesario').not().isEmpty(),
        check('status', 'El estado del deporte es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    updateSport);

module.exports = router;