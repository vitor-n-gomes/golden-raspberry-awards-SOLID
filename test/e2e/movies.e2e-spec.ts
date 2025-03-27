import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { MovieModule } from "@/app/movie/movie.module";
import MovieByCSVSeed from "./seeds/movie-by-csv.seeds";

describe("MoviesController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MovieModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await MovieByCSVSeed.handle();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/movies (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/movies")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("/movies/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/movies/4")
      .expect(200);

    expect(response.body).toHaveProperty("id", 4);
  });

  it("/movies (POST)", async () => {
    const newMovie = {
      year: 2023,
      title: "Test Movie",
      studios: "Test Studio",
      winner: false,
    };

    const response = await request(app.getHttpServer())
      .post("/movies")
      .send(newMovie)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newMovie.title);
  });

  it("/movies/:id (PUT)", async () => {
    const updatedMovie = {
      title: "Updated Test Movie",
    };

    const response = await request(app.getHttpServer())
      .put("/movies/3")
      .send(updatedMovie)
      .expect(200);

    expect(response.body.title).toBe(updatedMovie.title);
  });

  it("/movies/:id (DELETE)", async () => {
    await request(app.getHttpServer()).delete("/movies/1").expect(200);
  });
});
