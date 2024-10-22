const express = require("express");
const productRoute = express.Router();
const Producto = require("../models/Productos");

productRoute.post('/agregar-producto', async (req, res) => {
    const {nombre, descripcion, id, stock, imgPortada, precio} = req.body
    console.log(req.body);
    const producto = {
        nombre,
        descripcion,
        id,
        stock,
        imgPortada,
        precio
    }
    try {
        const producto = await Producto.create(req.body);
        res.status(201).send(producto);
    } catch (error) {
        res.status(500).send(error);
    }
})

productRoute.put('/editar-producto/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        });
        res.status(200).send(producto);
    } catch (error) {
        res.status(500).send(error);
    }
})

productRoute.get('/productos', async (req, res) => {
    try {
        let productoRes = await Producto.find()
        console.log(productoRes);
        res.status(200).send(productoRes)
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

productRoute.get('/selected/:idProductoSel', async (req, res) => {
    try {
        let select = await Producto.findById(req.params.idProductoSel)
        if (!select) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.status(200).send(select)
    } catch (error) {
        res.status(500).send("Error")
    }
})

productRoute.delete('/eliminar/:idProducto', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.idProducto);
        res.status(204).send("Producto Eliminado.")
    } catch (error) {
        res.status(500).send("Error")
    }
})

module.exports = productRoute;