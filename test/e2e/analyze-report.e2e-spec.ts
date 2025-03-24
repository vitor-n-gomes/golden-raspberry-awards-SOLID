import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MovieRepository } from '@/app/movie/repositories/interfaces/movie.repository';
import { AnalyzeReportModule } from '@/app/analyze-report/analyze-report.module';
import MovieByCsvSeed from './seeds/movie-by-csv.seeds';

describe('AnalyzeReport (e2e)', () => {
  let app: INestApplication;
  let movieRepository: MovieRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AnalyzeReportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    movieRepository = moduleFixture.get<MovieRepository>(MovieRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/analyze-producer-award-intervals (GET) should return correct producer-award intervals', async () => {
    const mockMovies = [
      {
        producers: 'Producer A',
        year: 2000,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer A',
        year: 2005,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B',
        year: 2010,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B',
        year: 2020,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const response = await request(app.getHttpServer())
      .get('/analyze-producer-award-intervals')
      .expect(200);

    expect(response.body).toEqual({
      min: [
        {
          producer: 'Producer A',
          interval: 5,
          previousWin: 2000,
          followingWin: 2005,
        },
      ],
      max: [
        {
          producer: 'Producer B',
          interval: 10,
          previousWin: 2010,
          followingWin: 2020,
        },
      ],
    });
  });

  it('/analyze-producer-award-intervals (GET) should return empty intervals when no winning movies exist', async () => {
    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue([]);

    const response = await request(app.getHttpServer())
      .get('/analyze-producer-award-intervals')
      .expect(200);

    expect(response.body).toEqual({
      min: [],
      max: [],
    });
  });

  it('/analyze-producer-award-intervals (GET) should handle a single winning movie correctly', async () => {
    const mockMovies = [
      {
        producers: 'Producer A',
        year: 2000,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const response = await request(app.getHttpServer())
      .get('/analyze-producer-award-intervals')
      .expect(200);

    expect(response.body).toEqual({
      min: [],
      max: [],
    });
  });

  it('/analyze-producer-award-intervals (GET) should handle multiple producers in a single movie', async () => {
    const mockMovies = [
      {
        producers: 'Producer A and Producer B',
        year: 2000,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer A',
        year: 2005,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B',
        year: 2010,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const response = await request(app.getHttpServer())
      .get('/analyze-producer-award-intervals')
      .expect(200);

    expect(response.body).toEqual({
      min: [
        {
          producer: 'Producer A',
          interval: 5,
          previousWin: 2000,
          followingWin: 2005,
        },
      ],
      max: [
        {
          producer: 'Producer B',
          interval: 10,
          previousWin: 2000,
          followingWin: 2010,
        },
      ],
    });
  });

  it('/analyze-producer-award-intervals (GET) should return correct producer-award intervals from CSV', async () => {
    await MovieByCsvSeed.handle();

    const response = await request(app.getHttpServer())
      .get('/analyze-producer-award-intervals')
      .expect(200);

    expect(response.body).toEqual({
      min: [
        {
          previousWin: 1990,
          followingWin: 1991,
          interval: 1,
          producer: 'Joel Silver',
        },
      ],
      max: [
        {
          previousWin: 2002,
          followingWin: 2015,
          interval: 13,
          producer: 'Matthew Vaughn',
        },
      ],
    });
  });
});
