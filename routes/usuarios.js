const express = require("express");
const userRoute = express.Router();

const UserData = require("../models/Usuario")

const bCrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotEnv = require("dotenv");
const Usuario = require("../models/Usuario");

const adminK = process.env.ADMIN_ACCESS;

const saltRounds = 10;

const hashPassword = async (contraseña) => {
    const hashing = await bCrypt.hash(contraseña, saltRounds);
    return hashing;
}

userRoute.post("/signUp", async (req, res) => {
    const {contraseña, nombre, apellido, email} = req.body;

    if (!contraseña) {
        console.log('Campo Inválido.');
        return res.status(401).send({message: 'Credenciales no válidas: Contraseña'});
    }

    const hashed = await hashPassword(contraseña);
    const userData = {
        contraseña: hashed,
        nombre,
        apellido,
        email
    }

    try {
        let newUser = await UserData.create(userData);
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
    }
    }
)

userRoute.post('/logIn', async (req, res) => {
    try {
        const email = req.body.email;
        const contraseña = req.body.contraseña;
        const user = await Usuario.findOne({email: email});

        const match = await bCrypt.compare(contraseña, user.contraseña);
        const payload = {email, nombre: user.nombre, apellido: user.apellido};

        if (match) {
            console.log('Contraseña válida. Iniciando sesión...');
            const token = JWT.sign(payload, adminK);
            res.cookie("token", token);
            res.status(200).send(payload);
        } else {
            console.log('Contraseña incorrecta');
            res.status(401).send({message: 'Credenciales no válidas. Verifica tu usuario y contraseña.'});
        }
        
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).send({message: 'Error en la autenticación.'});
    }
});

userRoute.post('/logOut', async (req, res) => {
    try {
        res.clearCookie("token");
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
})

userRoute.get('/data/:idUser', async (req, res) => {
    try {
        let answer = await UserData.findById(req.params.idUser)
        res.status(200).send({user: {nombre: answer.nombre,
             apellido: answer.apellido,
              email: answer.email}})
    } catch (error) {
        res.status(500).send(console.log("Error."))
    }
})

userRoute.get('/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        const payload = JWT.verify(token, adminK);
        res.send(payload)
    } catch (error) {
        res.status(401).send(error.message);
    }
})

module.exports = userRoute;