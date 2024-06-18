const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();

// Base de datos
dbConnection();

const port = process.env.PORT;

// Directorio Publico
app.use(express.static('./public'));

// CORS
app.use(cors());

// Lectura y parseo del bosy
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Manejar rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});