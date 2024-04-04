import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Connection } from "mongoose";

import { AppModule } from "@/app.module";
import { DatabaseService } from "@/database/database.service";

describe("TemplatesController (e2e)", () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getConnection();
  });

  afterAll(async () => {
    await dbConnection.close();
    await app.close();
  });

  beforeEach(async () => {
    const allCollections = await dbConnection.db.listCollections().toArray();

    for (const collection of allCollections) {
      await dbConnection.collection(collection.name).deleteMany({});
    }
  });

  it("should create a template", async () => {
    const { body: template } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template",
        body: "template description",
      })
      .expect(201);

    expect(template).toEqual({
      id: expect.any(String),
      name: "template",
      body: "template description",
    });
  });

  it("should find all templates", async () => {
    const { body: template1 } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template 1",
        body: "template 1 description",
      });

    const { body: template2 } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template 2",
        body: "template 2 description",
      });

    return request(app.getHttpServer())
      .get("/templates")
      .expect(200)
      .expect([
        {
          id: template1.id,
          name: "template 1",
          body: "template 1 description",
        },
        {
          id: template2.id,
          name: "template 2",
          body: "template 2 description",
        },
      ]);
  });

  it("should find a template", async () => {
    const { body: template } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template 1",
        body: "template 1 description",
      });

    return request(app.getHttpServer())
      .get(`/templates/${template.id}`)
      .expect(200)
      .expect({
        id: template.id,
        name: "template 1",
        body: "template 1 description",
      });
  });

  it("should return 404 when a template is not found", async () => {
    return request(app.getHttpServer())
      .get("/templates/660ef95ac1ae45269c62a782")
      .expect(404);
  });

  it("should only update the provided fields in a template", async () => {
    const { body: template1 } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template",
        body: "template description",
      });

    const { body: template2 } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template 2",
        body: "template 2 description",
      });

    await request(app.getHttpServer())
      .patch(`/templates/${template1.id}`)
      .send({
        body: "updated template description",
      })
      .expect(200)
      .expect({
        id: template1.id,
        name: "template",
        body: "updated template description",
      });

    return request(app.getHttpServer())
      .get(`/templates/${template2.id}`)
      .expect(200)
      .expect({
        id: template2.id,
        name: "template 2",
        body: "template 2 description",
      });
  });

  it("should return 404 when a template to update is not found", async () => {
    return request(app.getHttpServer())
      .patch("/templates/660ef95ac1ae45269c62a782")
      .send({
        name: "template",
        body: "template description",
      })
      .expect(404);
  });

  it("should delete a template", async () => {
    const { body: template } = await request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template",
        body: "template description",
      });

    await request(app.getHttpServer())
      .delete(`/templates/${template.id}`)
      .expect(200);

    return request(app.getHttpServer())
      .get(`/templates/${template.id}`)
      .expect(404);
  });
});
