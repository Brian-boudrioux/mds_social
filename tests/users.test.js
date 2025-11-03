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

    afterAll(async () => {
        await db.end();
    });

});

