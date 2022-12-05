const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Conexion BD
dbConnect();

// Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/sports', require('./routes/sports'));
app.use('/api/teams', require('./routes/teams'));

app.listen( process.env.PORT, () => {
    console.log('Server Run');
})
