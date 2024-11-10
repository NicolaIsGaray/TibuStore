const mongoose = require("mongoose");
const { type } = require("os");

const productData = new mongoose.Schema ({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require:true
    },
    stock: {
        type: Number,
        require: true,
        min: [0, "Ingresa un valor válido."]
    },
    precio: {
        type: Number,
        require: true
    },
    categoria: {
        type: String,
        require: true,
        enum: ['suplemento', 'vasosAndShakers', 'oferta']
    },
    imgPortada: {
        type: String
    },
    imagenes: [
        {
        type: String
        }
    ]
});

module.exports = mongoose.model("Productos", productData);