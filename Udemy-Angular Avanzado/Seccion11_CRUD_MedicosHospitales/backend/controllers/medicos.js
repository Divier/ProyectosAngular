
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const { response } = require('express');
const { default: mongoose } = require('mongoose');

 
const getMedicos = async(req, res) => {

    const medicos = await Medico.find()
    .populate('usuario', 'nombre')
    .populate('hospital', 'nombre');

    res.json({
        ok:true,
        medicos
    })
}

const createMedico = async(req, res = response) => {
    
    const uid = req.uid;
    
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const updateMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);
        if(!medicoDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un medico por ese id'
            })
        }

        const usuarioActualizado = await Medico.findByIdAndUpdate(id, campos, {new: true});

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

const deleteMedico = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const medicoDB = await Medico.findById(uid);
        if(!medicoDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un medico por ese id'
            })
        }

        await Medico.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Medico eliminado con exito'
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
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}