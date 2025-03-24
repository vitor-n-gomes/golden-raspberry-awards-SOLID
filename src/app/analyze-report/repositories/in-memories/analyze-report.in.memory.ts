import { Injectable } from '@nestjs/common';
import { AnalyzeReportRepository } from '../interfaces/analyze-report.repository';
import { ProducerIntervalsResult } from '../../models/producer-intervals-result.model';
import { MovieRepository } from '@/app/movie/repositories/interfaces/movie.repository';
import { ProducerInterval } from '../../models/producer-interval.model';

@Injectable()
export class AnalyzeReportInMemory implements AnalyzeReportRepository {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getProducerAwardIntervals(): Promise<ProducerIntervalsResult> {
    const winningMovies = (await this.movieRepository.getMovies()).filter(
      (movie) => movie.winner,
    );

    const producerIntervals: Record<string, ProducerInterval[]> = {};

    winningMovies.forEach((movie) => {
      const producers = movie.producers.split(/ and |, /);

      producers.forEach((producer) => {
        const producerSlug = this.generateSlug(producer);

        if (!producerIntervals[producerSlug]) {
          producerIntervals[producerSlug] = [];
        }

        const wins = producerIntervals[producerSlug];
        if (wins.length > 0) {
          const lastWin = wins[wins.length - 1];
          wins.push({
            previousWin: lastWin.followingWin,
            followingWin: movie.year,
            interval: movie.year - lastWin.followingWin,
            producer,
          });
        }

        wins.push({
          previousWin: movie.year,
          followingWin: movie.year,
          interval: 0,
          producer,
        });
      });
    });

    const allIntervals = Object.values(producerIntervals)
      .flat()
      .filter((interval) => interval.interval > 0);

    const minInterval = Math.min(
      ...allIntervals.map((interval) => interval.interval),
    );
    const maxInterval = Math.max(
      ...allIntervals.map((interval) => interval.interval),
    );

    return {
      min: allIntervals.filter((interval) => interval.interval === minInterval),
      max: allIntervals.filter((interval) => interval.interval === maxInterval),
    };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }
}
