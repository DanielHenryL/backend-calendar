/*
    Rutas de eventos / Events
    auth/events
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require("../helpers/isDate");


const router = Router();

// Todos pasan por la validacion del JWT
router.use( validarJWT );


// Obtener eventos
router.get( '/', getEventos );

// Crear Evento
router.post( 
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatorio').custom( isDate ),
        check('end','La fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos,
    ],
    crearEvento 
);

// actualizar eventos
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatorio').custom( isDate ),
        check('end','La fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos,
    ],
    actualizarEvento 
);

// Eliminar eventos
router.delete('/:id', eliminarEvento );

module.exports = router