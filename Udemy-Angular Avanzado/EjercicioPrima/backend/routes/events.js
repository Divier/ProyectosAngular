const { Router } = require('express');
const { getEvents, createEvent, updateEvent } = require('../controllers/events');

const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();

// Rutas
router.get('/', getEvents);

router.post(
    '/', 
    [
        validarJWT,
        check('date', 'La fecha del evento es necesaria').not().isEmpty(),
        check('teamOne', 'El equipo numero 1 es necesario').not().isEmpty(),
        check('teamTwo', 'El equipo numero 2 es necesario').not().isEmpty(),
        check('scoreOne', 'El marcador del equipo numero 1 es necesario').not().isEmpty(),
        check('scoreTwo', 'El marcador del equipo numero 2 es necesario').not().isEmpty(),
        check('sport', 'El deporte asociado al evento es necesario').not().isEmpty(),
        validarCampos
    ],
    createEvent);

router.put(
    '/:id', 
    [
        validarJWT,
        check('date', 'La fecha del evento es necesaria').not().isEmpty(),
        check('teamOne', 'El equipo numero 1 es necesario').not().isEmpty(),
        check('teamTwo', 'El equipo numero 2 es necesario').not().isEmpty(),
        check('scoreOne', 'El marcador del equipo numero 1 es necesario').not().isEmpty(),
        check('scoreTwo', 'El marcador del equipo numero 2 es necesario').not().isEmpty(),
        check('sport', 'El deporte asociado al evento es necesario').not().isEmpty(),
        check('status', 'El estado del evento es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    updateEvent);

module.exports = router;