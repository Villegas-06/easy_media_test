const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('No se proporcionó un token');
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token no válido');
        }
        req.user = decoded;
        next();
    });
};

// Ruta para el registro de usuarios
router.post('/register', (req, res) => {
    const { username, password, confirm_password, email } = req.body;

    if (!username || !password || !confirm_password || !email) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos' });
    }

    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    const newUser = new User({ username, password, email });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => res.json({ message: 'Usuario registrado exitosamente' }))
                .catch(err => res.json({ message: err }));
        });
    });
});


// Ruta para iniciar sesión y obtener un token de autenticación
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al comparar contraseñas' });
                }

                if (isMatch) {
                    const payload = { id: user.id, username: user.username, email: user.email };
                    const token = jwt.sign(payload, config.secret, { expiresIn: '1h' });

                    res.json({ token, user: payload, message: 'Logueado correctamente' });
                } else {
                    res.status(401).json({ message: 'Contraseña incorrecta' });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error en la solicitud de inicio de sesión' });
        });
});

module.exports = router;
