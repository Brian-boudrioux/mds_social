import authModel from "../models/authModel.js";
import argon2 from "argon2";

const register = async (req, res, next) => {
  try {
    const { pseudo, email, password } = req.body;
    if (!pseudo || !email || !password) return res.status(400).json("all field is required");

    const [[user]] = await authModel.findUserByEmail(email);
    if (user) return res.status(400).json("user with specified email already exist");

    const hashedPassword = await argon2.hash(password);
    const [result] = await authModel.createUser(pseudo, email, hashedPassword);
    if (result.affectedRows > 0) res.status(201).json({pseudo, email});
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

export default {
    register
}