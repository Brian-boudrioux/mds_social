import db from "../config/db.js";

const createUser = (pseudo, email, hashedPassword) => {
    return db.query("INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)", [pseudo, email, hashedPassword]);
};

const findUserByEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email = ?", [email]);
}

export default {
    createUser,
    findUserByEmail
}