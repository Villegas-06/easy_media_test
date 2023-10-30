const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo cors
const config = require('./config');

const app = express();
const authRoutes = require('./routes/auth');
const newPost = require('./routes/create-post');
const myPost = require('./routes/post')

// Configura el análisis del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilita CORS
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/create-post', newPost);
app.use('/api/my-post', myPost);

// Conexion a la base de datos MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
