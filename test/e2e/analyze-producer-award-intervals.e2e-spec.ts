import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AnalyzeReportModule } from "@/app/analyze-report/analyze-report.module";
import MovieByCSVSeed from "./seeds/movie-by-csv.seeds";

describe("AnalyzeProducerAwardIntervalsController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AnalyzeReportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await MovieByCSVSeed.handle();
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

    expect(response.body.min).toEqual([
      {
        producer: "Matthew Vaughn",
        interval: 1,
        previousWin: 2002,
        followingWin: 2003,
      },
      {
        producer: "Joel Silver",
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
    ]);

    expect(response.body.max).toEqual([
      {
        producer: "Matthew Vaughn",
        interval: 22,
        previousWin: 1980,
        followingWin: 2002,
      },
      {
        producer: "Matthew Vaughn",
        interval: 22,
        previousWin: 2015,
        followingWin: 2037,
      },
    ]);
  });
});
