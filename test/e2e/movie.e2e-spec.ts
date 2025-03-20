import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MovieModule } from '../../src/app/movie/movie.module';
import { Movie } from 'src/app/movie/models/movie.model';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MovieModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /movies should return an array of movies', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect((response) => {
        const movies: Movie[] = response.body;
        expect(Array.isArray(movies)).toBe(true);
        expect(movies.length).toBeGreaterThan(0);
        const firstMovie = movies[0];
        expect(firstMovie).toHaveProperty('id');
        expect(firstMovie).toHaveProperty('year');
        expect(firstMovie).toHaveProperty('title');
        expect(firstMovie).toHaveProperty('studios');
        expect(firstMovie).toHaveProperty('producers');
        expect(firstMovie).toHaveProperty('winner');
      });
  });

  it('GET /nonexistent should return 404', () => {
    return request(app.getHttpServer())
      .get('/nonexistent')
      .expect(404);
  });
});