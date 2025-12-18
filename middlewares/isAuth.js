import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new ApiError(401, "missing token");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch(error) {
        console.log(error);
        res.status(error.status || 401).json(error.message);
    }
}

export default isAuth;