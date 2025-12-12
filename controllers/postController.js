import postModel from "../models/postModel.js";
import ApiError from "../utils/ApiError.js";

const getAll = async ({ res, next }) => {
  try {
    const [posts] = await postModel.readAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [[post]] = await postModel.readOne(id);
    if (!post) res.sendStatus(404);
    else res.json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    if (!req.body)
      throw new ApiError(400, "Missing required fields");
    
    const { content } = req.body;
    req.body.id_user = req.user.id;

    if (!content) 
      throw new ApiError(400, "all field is required");

    const [result] = await postModel.insertOne(req.body);
    const [[post]] = await postModel.readOne(result.insertId);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    if (!req.body)
      throw new ApiError(400, "Missing required fields");
    
    const post = req.body;
    const id = Number(req.params.id);
    const [result] = await postModel.updateOne(id, post);

    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [result] = await postModel.destroyOne(id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getOne,
  createPost,
  updatePost,
  deletePost,
};