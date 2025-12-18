export const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err.stack || err.message);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ message: 'Session invalide ou token CSRF manquant/expiré.' });
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};