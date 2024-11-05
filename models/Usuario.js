const mongoose = require("mongoose");
const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

const userData = new mongoose.Schema ({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator: function(v) {
                return regex.test(v);
            },
            message: "Debes ingresar un correo válido."
        },
        contraseña: {type: String, require: true, min: 8},
        productosFavoritos: {}
    },
    contraseña: {
        type: String,
        require
    },
    rol: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    }
})

module.exports = mongoose.model("Información del Usuario", userData)