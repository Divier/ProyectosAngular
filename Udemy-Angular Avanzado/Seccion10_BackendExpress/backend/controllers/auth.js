const { response } = require("express");

const Usuario = require('../models/usuario');

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
                msg:'No existe un usuario por ese email'
            })
        }

        //Validar contraseña
        console.log(usuarioDB);

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(404).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }

        // Generar el Token 
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    login
}