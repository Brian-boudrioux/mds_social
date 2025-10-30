import postModel from "../models/postModel.js";

const getAll = async ({ res }) => {
  try {
    const [posts] = await postModel.readAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [[post]] = await postModel.readOne(id);
    if (!post) res.sendStatus(404);
    else res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    req.body.id_user = req.user.id;
    if (!content) return res.status(400).json("all field is required");
    const [result] = await postModel.insertOne(req.body);
    const [[post]] = await postModel.readOne(result.insertId);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const updatePost = async (req, res) => {
  try {
    const post = req.body;
    const id = Number(req.params.id);
    const [result] = await postModel.updateOne(id, post);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const deletePost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [result] = await postModel.destroyOne(id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

export default {
  getAll,
  getOne,
  createPost,
  updatePost,
  deletePost,
};