const express = require("express");
const app = express();
const routes = require("./routes/index");

const mongoose = require("mongoose");
const url = "mongodb+srv://nicogaray2713:tqKJjQdsKgsk04Gb@generaldata.xnxij.mongodb.net/?retryWrites=true&w=majority&appName=generalData"

app.use("/", routes);
app.use(express.json());

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        app.listen(3000, () => {
            console.log("El servidor está escuchando en el puerto 3000 y conectado a la base de datos.");
        })
    } catch (error) {
        console.log(error);
        
    }
}

connectToMongo();