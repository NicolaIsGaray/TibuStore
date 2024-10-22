const express = require("express");
const router = express.Router();

router.get('/index', function (req, res) {
    res.status(200).send("Hola, chavales.")
})

// //Recibimos lo que pasa en el body.
// router.post('/album', (req, res) => {
//     console.log("REQ", req);
//     console.log("REQ:BODY", req.body);
//     res.status(200).send(`Tu album es ${req.body.titulo} del artista ${req.body.artist}.`)
// })

// //Para params, hay que poner "/:" y req.params toma lo que esta despues de los ":".
// router.post("/album/:numeroAlbum", (req, res) => {
//     console.log(req.params);
//     res.status(200).send("Se imprimió el params.")
// })

module.exports = router