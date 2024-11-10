const express = require("express");
const userRoute = express.Router();

const UserData = require("../models/Usuario")

const bCrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotEnv = require("dotenv");
const Usuario = require("../models/Usuario");

dotEnv.config();

const adminK = process.env.ADMIN_ACCESS;

const saltRounds = 10;

const hashPassword = async (contraseña) => {
    const salt = await bCrypt.genSalt(saltRounds);
    const hashedPassword = await bCrypt.hash(contraseña, salt);
    return hashedPassword;
};

userRoute.post("/signUp", async (req, res) => {
    const {nombre, apellido, username, email, contraseña} = req.body;

    if (!contraseña) {
        console.log('Campo Inválido. Contraseña');
        return res.status(401).send({message: 'Credenciales no válidas: Contraseña'});
    }

    const hashed = await hashPassword(contraseña);
    const userData = {
        contraseña: hashed,
        nombre,
        apellido,
        username,
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
        const { username, contraseña } = req.body;
        const user = await Usuario.findOne({ username: username });

        if (!user) {
            return res.status(401).send({ message: 'Usuario no encontrado.' });
        }

        const match = await bCrypt.compare(contraseña, user.contraseña);

        if (match) {
            const payload = { email: user.email, nombre: user.nombre, apellido: user.apellido, username: user.username };
            const token = JWT.sign(payload, adminK);
            res.cookie("token", token);
            res.status(200).send(payload);
        } else {
            res.status(401).send({ message: 'Contraseña incorrecta.' });
        }

    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).send({ message: 'Error en la autenticación.' });
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