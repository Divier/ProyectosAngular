const jwt = require('jsonwebtoken');

const { response } = require('express');

const validarJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;
        next();
    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
} 

module.exports = {
    validarJWT
}