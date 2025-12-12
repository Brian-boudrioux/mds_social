import authModel from "../models/authModel.js";
import ApiError from "../utils/ApiError.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res, next) => {
    try {

      if (!req.body)
        throw new ApiError(400, "Missing required fields");

        const { email, password } = req.body;
        if (!email || !password) 
          throw new ApiError(400, "email and password is required");

        const [[user]] = await authModel.findUserByEmail(email);
        if (!user) 
          throw new ApiError(400, "user with specified email doesnt exist");

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) 
          throw new ApiError(400, "password do not match");

        const token = jwt.sign({id: user.id, email: user.email, pseudo: user.pseudo}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.header("Authorization", `Bearer ${token}`).send();
    } catch(error) {
        next(error);
    }
}

export default {
    register,
    login,
    loginVulnerable
}