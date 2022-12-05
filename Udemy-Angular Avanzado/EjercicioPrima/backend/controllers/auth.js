
const { response } = require("express");

const Usuario = require('../models/user');

const bcrypt = require('bcryptjs');

const { generarJWT } = require("../helpers/jwt");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Validar email
        const usuarioDB = await Usuario.findOne( { email } );
        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario o Password incorrectos'
            })
        }

        //Validar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario o Password incorrectos'
            })
        }

        // Generar el Token 
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    login
}