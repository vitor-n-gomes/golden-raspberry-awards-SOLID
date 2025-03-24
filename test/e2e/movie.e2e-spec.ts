import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MovieModule } from '../../src/app/movie/movie.module';
import { Movie } from 'src/app/movie/models/movie.model';
import MovieByMockSeed from './seeds/movie-by-mock.seeds';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MovieModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await MovieByMockSeed.handle();
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

  it('POST /movies should create a new movie', () => {
    const newMovie: Partial<Movie> = {
      year: 2023,
      title: 'New Movie',
      studios: 'Studio A',
      producers: 'Producer A',
      winner: false,
    };

    return request(app.getHttpServer())
      .post('/movies')
      .send(newMovie)
      .expect(201)
      .expect((response) => {
        const createdMovie: Movie = response.body;
        expect(createdMovie).toHaveProperty('id');
        expect(createdMovie.year).toBe(newMovie.year);
        expect(createdMovie.title).toBe(newMovie.title);
        expect(createdMovie.studios).toBe(newMovie.studios);
        expect(createdMovie.producers).toBe(newMovie.producers);
        expect(createdMovie.winner).toBe(newMovie.winner);
      });
  });

  it('GET /movies/:id should return a movie by ID', async () => {
    const movieId = '2';
    return request(app.getHttpServer())
      .get(`/movies/${movieId}`)
      .expect(200)
      .expect((response) => {
        const movie: Movie = response.body;
        expect(movie).toHaveProperty('id', movieId);
        expect(movie).toHaveProperty('title');
        expect(movie).toHaveProperty('year');
      });
  });

  it('PUT /movies/:id should update an existing movie', async () => {
    const movieId = '2';
    const updatedMovie: Partial<Movie> = {
      title: 'Updated Movie Title',
      winner: true,
    };

    return request(app.getHttpServer())
      .put(`/movies/${movieId}`)
      .send(updatedMovie)
      .expect(200)
      .expect((response) => {
        const movie: Movie = response.body;
        expect(movie).toHaveProperty('id', movieId);
        expect(movie.title).toBe(updatedMovie.title);
        expect(movie.winner).toBe(updatedMovie.winner);
      });
  });

  it('DELETE /movies/:id should delete a movie by ID', async () => {
    const movieId = '1';
    return request(app.getHttpServer())
      .delete(`/movies/${movieId}`)
      .expect(200);
  });

  it('GET /nonexistent should return 404', () => {
    return request(app.getHttpServer()).get('/nonexistent').expect(404);
  });
});
