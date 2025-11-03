import supertest from "supertest";
import app from "../config/server.js";
import db from "../config/db.js";


describe("test routes /users : " , () => {

    beforeAll(async () => {
        // Nettoyer la base avant de commencer les tests
        await db.query("DELETE FROM users");
        // réinitialiser les id en auto_increment pour s'assurer que les tests soit reproductible
        await db.query("ALTER TABLE users AUTO_INCREMENT = 1");
    });

    test("GET /users doit retourner un tableau d'utilisateurs : ", async () => {
        const response = await supertest(app).get("/api/users");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/register doit retourner une erreur 400 si un champ est manquant: ", async () => {
        const response = await supertest(app).post("/api/register").send({pseudo: "toto", password: "aaaa"});

        expect(response.status).toBe(400);
        expect(response.body).toBe("all field is required");
    });

    test("POST /api/register doit retourner la ressource user crée avec un status 201 : ", async () => {
        const response = await supertest(app).post("/api/register").send({pseudo: "toto", email: "a@a.fr", password: "aaaa"});

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
        expect(response.body.email).toBe("a@a.fr");
    });

    test("GET /api/users/:id doit retourner l'utilisateur correspondant à l'id :", async () => {
        const response = await supertest(app).get("/api/users/1");

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.email).toBe("a@a.fr");
    });

    test("PUT /api/users/:id doit mettre à jours les données de l'utilisateur :", async () => {
        const { header } = await supertest(app).post("/api/login").send({ pseudo: "toto", email: "a@a.fr", password: "aaaa" });
        const token = header.authorization.split(" ")[1];
        const authHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await supertest(app).put("/api/users/1").set(authHeaders).send({pseudo: "tata"});

        expect(response.status).toBe(204);
    });

    test("PUT /api/users/:id doit retoruner un status 401 si le token est manquant : ", async () => {
        const response = await supertest(app).put("/api/users/100");

        expect(response.status).toBe(401);
    });

    test("DELETE /api/users/:id doit supprimer l'utilisateur :", async () => {
        const { header } = await supertest(app).post("/api/login").send({ pseudo: "toto", email: "a@a.fr", password: "aaaa" });
        const token = header.authorization.split(" ")[1];
        const authHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await supertest(app).delete("/api/users/1").set(authHeaders);

        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        await db.end();
    });

});

