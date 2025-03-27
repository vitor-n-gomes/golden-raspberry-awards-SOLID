import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "@/app.module";

describe("AnalyzeProducerAwardIntervalsController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/analyze-producer-award-intervals (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/analyze-producer-award-intervals")
      .expect(200);

    expect(response.body).toHaveProperty("min");
    expect(response.body).toHaveProperty("max");
  });
});
