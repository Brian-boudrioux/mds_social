import db from "../config/db.js";


const readAll = () => {
    return db.query("SELECT * FROM posts");
};

const readOne = (id) => {
    return db.query("SELECT * FROM posts WHERE id = ?", [id]);
};

const insertOne = (post) => {
    const { content, id_user } = post;
    return db.query("INSERT INTO posts (content, id_user) VALUES (?, ?)", [
        content, id_user
    ]);
};

const updateOne = (id, post) => {
    return db.query("UPDATE posts SET ? WHERE id = ?", [post, id]);
};

const destroyOne = (id) => {
    return db.query("DELETE FROM posts WHERE id = ?", [id]);
};


export default {
    readAll,
    readOne,
    insertOne,
    updateOne,
    destroyOne,
};