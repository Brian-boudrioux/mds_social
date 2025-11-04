import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import messageModel from "../models/messageModel.js";
dotenv.config();

let io;

const isAuth = (socket) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.token;
    if (!token) throw new Error("Token manquant");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // on garde l’utilisateur dans la session socket
    } catch (err) {
        console.error("JWT invalide :", err.message);
        throw new Error("Token invalide");
    }
}

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        try {
            isAuth(socket);
            next();
        } catch (err) {
            next(new Error("Token invalide"));
        }
    });

    io.on("connection", async (socket) => {
        console.info(`✅ Utilisateur connecté : ${socket.user.id}`);
        const [messages] = await messageModel.getRecentMessagesForUser(socket.user.id);
        socket.emit("previousMessages", messages);

        socket.on("sendMessage", (body) => {
            const message = {
                sender: socket.user.pseudo,
                content: body.content,
                timestamp: new Date(),
            };
            
            io.emit("newMessage", message);
        });

        socket.join(`user_${socket.user.id}`);

        socket.on("sendPrivateMessage", async (body) => {
            const message = {
                sender: socket.user.pseudo,
                content: body.content,
                timestamp: new Date(),
            };
            
            await messageModel.createPrivateMessage(socket.user.id, body.receiverId, body.content);
            io.to(`user_${body.receiverId}`).emit("privateMessage", message);
        });

        socket.on("getConversation", async ({receiverId}) => {
            const [messages] = await messageModel.getConversation(socket.user.id, receiverId);
            socket.emit("conversationHistory", messages);
        });

        socket.on("disconnet", () => {
            console.info(`❌ ${socket.user.email} s'est déconnecté`);
        });
    });

    console.log("💬 Socket.io initialisé");
    return io;
}

export const getIO = () => {
    if (!io) throw new Error("Socket.io non initialisé !");
    return io;
};