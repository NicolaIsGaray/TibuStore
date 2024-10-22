const express = require("express");
const router = express.Router();

const rutaUsuario = require("../routes/usuarios");
const rutaProducto = require("../routes/productos");

router.get('/home', async (req, res) => {
    try {
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.use('/usuario', rutaUsuario);
router.use('/producto', rutaProducto);

module.exports = router;