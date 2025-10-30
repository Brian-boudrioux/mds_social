import db from "../config/db.js";


const readAll = () => {
    return db.query("SELECT * FROM users");
};

const readOne = (id) => {
    return db.query("SELECT * FROM users WHERE id = ?", [id]);
};

const insertOne = (user) => {
    const { pseudo, email, password } = user;
    return db.query("INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)", [
        pseudo, email, password
    ]);
};

const updateOne = (id, user) => {
    return db.query("UPDATE users SET ? WHERE id = ?", [user, id]);
};

const destroyOne = (id) => {
    return db.query("DELETE FROM users WHERE id = ?", [id]);
};


export default {
    readAll,
    readOne,
    insertOne,
    updateOne,
    destroyOne,
};