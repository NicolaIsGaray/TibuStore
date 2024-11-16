const express = require("express");
const pageRouter = express.Router();

const Pagina = require("../models/Página");

const verifyRole = require ("../middlewares/verifyRole");

pageRouter.post('/editar-acerca', verifyRole, async (req, res) => {
    if (req.isAdmin) {
        try {
            const { acercaInfo } = req.body;
    
            // Buscamos el documento que contiene la información de la sección "acerca" y lo actualizamos
            const paginaActualizada = await Pagina.findOneAndUpdate({ acerca: acercaInfo });
    
            if (!paginaActualizada) {
                return res.status(404).json({ error: 'Página no encontrada' });
            }
    
            res.json({ success: true, pagina: paginaActualizada }); // Devuelve el documento actualizado
        } catch (error) {
            console.error('Error al editar sección acerca:', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    } else {
        console.error("No Access.")
    }
    
});

pageRouter.post('/editar-contacto', async (req, res) => {
    try {
        const { contactoInfo } = req.body;

        // Buscamos el documento que contiene la información de la sección "acerca" y lo actualizamos
        const paginaActualizada = await Pagina.findOneAndUpdate({ contacto: contactoInfo });

        if (!paginaActualizada) {
            return res.status(404).json({ error: 'Página no encontrada' });
        }

        res.json({ success: true, pagina: paginaActualizada }); // Devuelve el documento actualizado
    } catch (error) {
        console.error('Error al editar sección contacto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = pageRouter;