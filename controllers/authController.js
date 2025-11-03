import authModel from "../models/authModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res, next) => {
  try {
    const { pseudo, email, password } = req.body;
    if (!pseudo || !email || !password) return res.status(400).json("all field is required");

    const [[user]] = await authModel.findUserByEmail(email);
    if (user) return res.status(400).json("user with specified email already exist");

    const hashedPassword = await argon2.hash(password);
    const [result] = await authModel.createUser(pseudo, email, hashedPassword);
    if (result.affectedRows > 0) res.status(201).json({id: result.insertId, pseudo, email});
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal error server");
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json("email and password is required");

        const [[user]] = await authModel.findUserByEmail(email);
        if (!user) return res.status(400).json("user with specified email doesnt exist");

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) return res.status(400).json("password do not match");

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.header("Authorization", `Bearer ${token}`).send();
    } catch(error) {
        console.error(error);
        res.status(500).json("Internal error server");
    }
}

export default {
    register,
    login
}