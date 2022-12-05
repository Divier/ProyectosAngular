
const { response } = require('express');

const Sport = require('../models/sport');

 
const getSports = async(req, res = response) => {

    const sports = await Sport.find();

    res.json({
        ok:true,
        sports
    })
}

const createSport = async(req, res = response) => {
    
    const { name } = req.body;

    try {
        const sportExists = await Sport.findOne({ name: {'$regex' : name, '$options' : 'i'} })
        
        if(sportExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El deporte ya existe'
            });
        }

        const sport = new Sport( req.body );
        await sport.save();

        res.json({
            ok:true,
            sport
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const updateSport = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const sportDB = await Sport.findById(uid);
        if(!sportDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un deporte por ese id'
            })
        }

        const { name, ...campos  } = req.body;
        const sportExists = await Sport.findOne({ name: {'$regex' : name, '$options' : 'i'} });

        if(sportExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El deporte ya existe'
            });
        }

        campos.name = name;
        const sportUpdate = await Sport.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            sport: sportUpdate
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
    getSports,
    createSport,
    updateSport
}