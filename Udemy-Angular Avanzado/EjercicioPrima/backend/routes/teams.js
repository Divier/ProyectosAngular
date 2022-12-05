const { Router } = require('express');
const { getTeams, createTeam, updateTeam } = require('../controllers/teams');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', getTeams);

router.post(
    '/', 
    [
        validarJWT,
        check('name', 'El nombre del equipo es necesario').not().isEmpty(),
        validarCampos
    ],
    createTeam);

router.put(
    '/:id', 
    [
        validarJWT,
        check('name', 'El nombre del equipo es necesario').not().isEmpty(),
        check('status', 'El estado del equipo es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    updateTeam);

module.exports = router;