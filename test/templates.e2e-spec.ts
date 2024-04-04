import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should create a template", () => {
    return request(app.getHttpServer())
      .post("/templates")
      .send({
        name: "template",
        body: "template description",
      })
      .expect(201)
      .expect({
        id: 1,
        name: "template",
        body: "template description",
      });
  });

  it("should find all templates", async () => {
    await request(app.getHttpServer()).post("/templates").send({
      name: "template 1",
      body: "template 1 description",
    });

    await request(app.getHttpServer()).post("/templates").send({
      name: "template 2",
      body: "template 2 description",
    });

    return request(app.getHttpServer())
      .get("/templates")
      .expect(200)
      .expect([
        {
          id: 1,
          name: "template 1",
          body: "template 1 description",
        },
        {
          id: 2,
          name: "template 2",
          body: "template 2 description",
        },
      ]);
  });

  it("should find a template", async () => {
    await request(app.getHttpServer()).post("/templates").send({
      name: "template 1",
      body: "template 1 description",
    });

    return request(app.getHttpServer()).get("/templates/1").expect(200).expect({
      id: 1,
      name: "template 1",
      body: "template 1 description",
    });
  });

  it("should only update the provided fields in a template", async () => {
    await request(app.getHttpServer()).post("/templates").send({
      name: "template",
      body: "template description",
    });

    await request(app.getHttpServer()).post("/templates").send({
      name: "template 2",
      body: "template 2 description",
    });

    return request(app.getHttpServer())
      .patch("/templates/1")
      .send({
        body: "updated template description",
      })
      .expect(200)
      .expect({
        id: 1,
        name: "template",
        body: "updated template description",
      });
  });

  it("should delete a template", async () => {
    await request(app.getHttpServer()).post("/templates").send({
      name: "template",
      body: "template description",
    });

    return request(app.getHttpServer())
      .delete("/templates/1")
      .expect(200)
      .expect({});
  });
});
