const { Router } = require('express');
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', getMedicos);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    createMedico);

router.put(
    '/:id', 
    [
    ], 
    updateMedico);

router.delete(
        '/:id',
        deleteMedico);

module.exports = router;