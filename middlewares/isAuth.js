import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(401).json("missing token");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json("token validation error");
    }
}

export default isAuth;