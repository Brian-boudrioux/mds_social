import userModel from "../models/userModel.js";

const getAll = async ({ res, next }) => {
  try {
    const [users] = await userModel.readAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [[user]] = await userModel.readOne(id);
    if (!user) res.sendStatus(404);
    else res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const createUser = async (req, res, next) => {
  try {
    const { pseudo, email, password } = req.body;
    if (!pseudo || !email || !password) return res.status(400).json("all field is required");
    const [result] = await userModel.insertOne(req.body);
    const [[user]] = await userModel.readOne(result.insertId);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = req.body;
    const id = Number(req.params.id);
    const [result] = await userModel.updateOne(id, user);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [result] = await userModel.destroyOne(id);
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
  createUser,
  updateUser,
  deleteUser,
};