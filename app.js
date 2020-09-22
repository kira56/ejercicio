const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const conectarDB = require('./config/db');
const Usuario = require('./models/Usuario');

conectarDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;


app.post('/register', (req, res) => {
    const { email, password } = req.body;

    const usuario = new Usuario({ email, password });

    usuario.save(err => {
        if (err) {
            res.status(500).send('Error al registrar al Usuario')
        } else {
            res.status(200).send('Usuario se registro correctamente')
        }
    })

})
app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;

    Usuario.findOne({ email }, (err, correo) => {
        if (err) {
            res.status(500).send('Error al autentificar usuario')
        } else if (!correo) {
            res.status(500).send('El usuario no existe')
        }

        res.status(200).send('Usuario logueado correctamente')
    })

})

app.listen(PORT, () => {
    console.log('Servidor corriendo')
});

module.exports = app;