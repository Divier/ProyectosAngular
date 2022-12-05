
const Hospital = require('../models/hospital');

const { response } = require('express');

 
const getHospitales = async(req, res) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre email');

    res.json({
        ok:true,
        hospitales
    })
}

const createHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok:true,
            hospital: hospitalDB
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const updateHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un hospital por ese id'
            })
        }

        const usuarioActualizado = await Hospital.findByIdAndUpdate(id, campos, {new: true});

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

const deleteHospital = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Hospital.findById(uid);
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
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}