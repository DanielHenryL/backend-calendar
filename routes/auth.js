/*
 Rutas de usuario / Auth
    /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),   
        check('name','El name debe de estar entre 4 y 12 caracteres').isLength({min:4, max:25}),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de contener como minimo 8 caracteres y debe contener numeros, simbolos, mayusculas').isStrongPassword({minLength:8,minNumbers:1,minSymbols:1,minUppercase:1}),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El email debe contener "@"').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','El password debe de contener como minimo 8 caracteres y debe contener numeros, simbolos, mayusculas').isStrongPassword({minLength:8,minNumbers:1,minSymbols:1,minUppercase:1}),
        validarCampos
    ],
    loginUsuario
);

router.get(
    '/renew',
    validarJWT,
    revalidarToken,
    );


module.exports = router