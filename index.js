import express from "express";
import db from "./config/db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenue sur l’API MyDigitalSchool!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));