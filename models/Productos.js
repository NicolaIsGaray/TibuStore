const mongoose = require("mongoose");

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
    imgPortada: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Información sobre el producto", productData);