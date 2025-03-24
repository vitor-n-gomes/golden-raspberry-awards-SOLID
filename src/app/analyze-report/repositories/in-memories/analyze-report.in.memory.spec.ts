import { ProducerIntervalsResult } from '@/app/analyze-report/models/producer-intervals-result.model';
import { AnalyzeReportInMemory } from '@/app/analyze-report/repositories/in-memories/analyze-report.in.memory';
import { Movie } from '@/app/movie/models/movie.model';
import { MovieRepository } from '@/app/movie/repositories/interfaces/movie.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('AnalyzeReportInMemory', () => {
  let analyzeReportInMemory: AnalyzeReportInMemory;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyzeReportInMemory,
        {
          provide: MovieRepository,
          useValue: {
            getMovies: jest.fn(),
          },
        },
      ],
    }).compile();

    analyzeReportInMemory = module.get<AnalyzeReportInMemory>(
      AnalyzeReportInMemory,
    );
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  it('should return correct producer-award intervals', async () => {
    const mockMovies: Movie[] = [
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

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
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

  it('should return empty intervals when no winning movies exist', async () => {
    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue([]);

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
      min: [],
      max: [],
    });
  });

  it('should handle a single winning movie correctly', async () => {
    const mockMovies: Movie[] = [
      {
        producers: 'Producer A',
        year: 2000,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
      min: [],
      max: [],
    });
  });

  it('should handle multiple producers with no intervals', async () => {
    const mockMovies: Movie[] = [
      {
        producers: 'Producer A',
        year: 2000,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B',
        year: 2005,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
      min: [],
      max: [],
    });
  });

  it('should handle multiple producers in a single movie', async () => {
    const mockMovies: Movie[] = [
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

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
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

  it('should handle producers with special characters and spaces', async () => {
    const mockMovies: Movie[] = [
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
        producers: 'Producer B and Co.',
        year: 2010,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B and Co.',
        year: 2020,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
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
        {
          producer: 'Co.',
          interval: 10,
          previousWin: 2010,
          followingWin: 2020,
        },
      ],
    });
  });

  it('should handle producers with special characters and spaces', async () => {
    const mockMovies: Movie[] = [
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
        producers: 'Producer B, Co.',
        year: 2010,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B, Co.',
        year: 2020,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
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
        {
          producer: 'Co.',
          interval: 10,
          previousWin: 2010,
          followingWin: 2020,
        },
      ],
    });
  });

  it('should handle producers with special characters and spaces', async () => {
    const mockMovies: Movie[] = [
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
        producers: 'Producer B, Co and Vitor',
        year: 2010,
        winner: true,
        title: '',
        studios: '',
      },
      {
        producers: 'Producer B, Co and Vitor',
        year: 2020,
        winner: true,
        title: '',
        studios: '',
      },
    ];

    jest.spyOn(movieRepository, 'getMovies').mockResolvedValue(mockMovies);

    const result: ProducerIntervalsResult =
      await analyzeReportInMemory.getProducerAwardIntervals();

    expect(result).toEqual({
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
        {
          producer: 'Co',
          interval: 10,
          previousWin: 2010,
          followingWin: 2020,
        },
        {
          producer: 'Vitor',
          interval: 10,
          previousWin: 2010,
          followingWin: 2020,
        },
      ],
    });
  });
});
