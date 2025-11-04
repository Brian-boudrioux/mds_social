import supertest from "supertest";
import app from "../config/server";
import db from "../config/db";

describe("Test Posts routes : ", () => {

    beforeAll(async () => {
        await db.query("DELETE FROM posts");
        await db.query("ALTER TABLE posts AUTO_INCREMENT = 1");
        await supertest(app).post("/api/register").send({ pseudo: "toto", email: "a@a.fr", password: "aaaa" });
    });

    afterAll(async () => {
        await db.end();
    });

    test("GET /posts doit retourner un tableau de posts : ", async () => {
        const response = await supertest(app).get("/api/posts");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /posts/:id doit retourner une erreur 404 : ", async () => {
        const response = await supertest(app).get("/api/posts/1");

        expect(response.status).toBe(404);
    });

    test("POST /posts/ doit ajouter un post en bdd : ", async () => {
        const { header } = await supertest(app).post("/api/login").send({ pseudo: "toto", email: "a@a.fr", password: "aaaa" });
        const token = header.authorization.split(" ")[1];
        const authHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await supertest(app).post("/api/posts").set(authHeaders).send({content: "mon super post"});

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
        expect(response.body.content).toBe("mon super post");
    });

    test("POST /posts/ doit renvoyer un status 401 unauthorized : ", async () => {
        const response = await supertest(app).post("/api/posts").send({content: "mon super post"});

        expect(response.status).toBe(401);
        expect(response.body).toBe("missing token");
    });
    



});
