import db from "../config/db.js";

const createPrivateMessage = async (senderId, receiverId, content) => {
    return await db.query("INSERT INTO private_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)", [senderId, receiverId, content]);
}

const getConversation = async (senderId, receiverId) => {
    return await db.query("SELECT * FROM private_messages WHERE sender_id = ? OR receiver_id = ?", [senderId, receiverId]);
}

const getRecentMessagesForUser = async (userId) => {
    return await db.query("SELECT * FROM private_messages WHERE sender_id = ? OR receiver_id = ?", [userId, userId]);
}


export default {
    createPrivateMessage,
    getConversation,
    getRecentMessagesForUser
}