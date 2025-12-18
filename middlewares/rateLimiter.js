import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Période de 15 minutes
    max: 5, // Limite à 5 tentatives de login par IP
    message: {
        message: "Trop de tentatives de connexion. Réessayez dans 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const requestLimiter = rateLimit({
    windowMs: 300000, // Période de 5 minutes
    max: 100, // Limite à 100 tentatives de login par IP
    message: {
        message: "Trop de requetes effectuer. Réessayez dans 5 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});