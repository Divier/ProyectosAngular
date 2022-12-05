
const Event = require('../models/event');

const Sport = require('../models/sport');

const Team = require('../models/team');

const { response } = require('express');

 
const getEvents = async(req, res = response) => {

    const events = await Event.find();

    res.json({
        ok:true,
        events
    })
}

const createEvent = async(req, res = response) => {
   
    const { date, teamOne, teamTwo, sport } = req.body;

    try {
        const resultValidate = await validate(teamOne, teamTwo, sport, res);

        if(resultValidate) {
            return resultValidate;
        }

        const eventExists = await Event.findOne({ 
            date,
            teamOne,
            teamTwo,
            sport
        })
        
        if(eventExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El evento para la fecha, equipos y deporte seleccionado, ya existe'
            });
        }

        const event = new Event({
            ...req.body
        });

        const eventDB = await event.save();
        res.json({
            ok: true,
            event: eventDB
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const updateEvent = async(req, res = response) => {

    const id = req.params.id;

    try {
        const eventDB = await Event.findById(id);
        if(!eventDB) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un evento por ese id'
            })
        }

        const { date, teamOne, teamTwo, sport } = req.body;
        const resultValidate = await validate(teamOne, teamTwo, sport, res);

        if(resultValidate) {
            return resultValidate;
        }

        const eventExists = await Event.findOne({ 
            date,
            teamOne,
            teamTwo,
            sport
        })
        
        if(eventExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El evento para la fecha, equipos y deporte seleccionado, ya existe'
            });
        }

        const { ...campos  } = req.body;
        const eventUpdate = await Event.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            event: eventUpdate
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const validate = async(teamOne, teamTwo, sport, res = response) => {
    
    const sportDB = await Sport.findById(sport);
    if(!sportDB) {
        return res.status(404).json({
            ok:false,
            msg:'No existe un deporte por ese id'
        })
    }

    const teamDB = await Team.findById(teamOne);
    if(!teamDB) {
        return res.status(404).json({
            ok:false,
            msg:'No existe un equipo por ese id'
        })
    }

    const teamDB2 = await Team.findById(teamTwo);
    if(!teamDB2) {
        return res.status(404).json({
            ok:false,
            msg:'No existe un equipo por ese id'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent
}