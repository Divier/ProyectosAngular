
const { response } = require('express');

const Team = require('../models/team');

 
const getTeams = async(req, res = response) => {

    const teams = await Team.find();

    res.json({
        ok:true,
        teams
    })
}

const createTeam = async(req, res = response) => {
    
    const { name } = req.body;

    try {
        const teamExists = await Team.findOne({ name: {'$regex' : name, '$options' : 'i'} })
        
        if(teamExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El equipo ya existe'
            });
        }

        const team = new Team( req.body );
        await team.save();

        res.json({
            ok:true,
            team
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const updateTeam = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const teamDB = await Team.findById(uid);
        if(!teamDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un equipo por ese id'
            })
        }

        const { name, ...campos  } = req.body;
        const teamExists = await Team.findOne({ name: {'$regex' : name, '$options' : 'i'} });

        if(teamExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El equipo ya existe'
            });
        }

        campos.name = name;
        const teamUpdate = await Team.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            team: teamUpdate
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
    getTeams,
    createTeam,
    updateTeam
}