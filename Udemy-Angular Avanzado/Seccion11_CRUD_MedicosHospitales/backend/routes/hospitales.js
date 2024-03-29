const { Router } = require('express');
const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', getHospitales);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    createHospital);

router.put(
    '/:id', 
    [
    ], 
    updateHospital);

router.delete(
        '/:id',
        deleteHospital);

module.exports = router;