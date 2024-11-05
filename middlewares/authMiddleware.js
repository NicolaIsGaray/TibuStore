const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.Usuario = decoded; // Añade los datos del usuario al request
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido o expirado." });
    }
}

function adminMiddleware(req, res, next) {
    if (req.Usuario && req.Usuario.rol === "admin") {
        next();
    } else {
        res.status(403).send("Acceso denegado. No tienes permisos de administrador.");
    }
}

module.exports = { authMiddleware, adminMiddleware };