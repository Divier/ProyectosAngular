
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');

const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

 
const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find();

    res.json({
        ok:true,
        usuarios,
        uid: req.uid
    })
}

const createUsuario = async(req, res = response) => {
    
    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email })
        
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario( req.body );

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar el Token 
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
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

const updateUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            })
        }

        //Actualizaciones
        const { email, ...campos } = req.body;
        if(usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe'
                });
            }
        }

        campos.email = email;

        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito'
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}