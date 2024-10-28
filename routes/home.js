const express = require("express");
const router = express.Router();

router.use(express.json());

const rutaUsuario = require("./usuarios");
const rutaProducto = require("./productos");

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