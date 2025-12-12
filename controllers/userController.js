import userModel from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import argon2 from "argon2";

const getAll = async ({ res, next }) => {
  try {
    const [users] = await userModel.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [[user]] = await userModel.readOne(id);
    if (!user) res.sendStatus(404);
    else res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!req.body)
      throw new ApiError(400, "Missing required fields");
    
    const user = req.body;
    const id = Number(req.params.id);

    if (req.user.id !== id) 
      throw new ApiError(401, "Permission denied");

    if (!user.password)
      throw new ApiError(400, "Password is missing"); 
      
    user.password = await argon2.hash(user.password);
    const [result] = await userModel.updateOne(id, user);

    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [result] = await userModel.destroyOne(id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getOne,
  updateUser,
  deleteUser,
};