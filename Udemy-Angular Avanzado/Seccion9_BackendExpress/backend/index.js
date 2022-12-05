const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Conexion BD
dbConnect();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok:true,
        msg: 'Hola Mundo'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo');
})
