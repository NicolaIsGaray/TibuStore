const express = require("express");
const productRoute = express.Router();
const Producto = require("../models/Productos");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

productRoute.post('/agregarProducto', async (req, res) => {
    const { nombre, descripcion, stock, imgPortada, precio, categoria } = req.body;
    console.log(req.body);

    console.log("Datos recibidos en el backend:", req.body);

    const product = {
        nombre,
        descripcion,
        stock,
        precio,
        categoria,
        imgPortada
    }

    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).send(nuevoProducto);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send({ message: "Error en el servidor", error: error.message });
    }
});

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

productRoute.get('/selected/:idProductSel', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.idProductSel);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

productRoute.get('/selected/:categoriaSel', async (req, res) => {
    try {
        let select = await Producto.findOne(req.params.categoria)
        if (!select) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.status(200).send(select)
    } catch (error) {
        res.status(500).send("Error")
    }
});

productRoute.delete('/eliminar/:idProducto', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.idProducto);
        res.status(204).send("Producto Eliminado.")
    } catch (error) {
        res.status(500).send("Error")
    }
});

productRoute.get('/buscar', async (req, res) => {
    const { query } = req.query;  // Recoge el término de búsqueda del query string
    try {
        // Realiza una búsqueda en la base de datos (ajusta los campos que quieras buscar)
        const productos = await Producto.find({
            nombre: { $regex: query, $options: 'i' }  // Búsqueda parcial y sin distinción de mayúsculas
        });

        if (productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }
        
        res.status(200).json(productos); // Retorna los productos encontrados
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

module.exports = productRoute;