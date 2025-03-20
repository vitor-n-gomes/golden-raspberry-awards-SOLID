import { Injectable } from '@nestjs/common';
import { AnalyzeReportRepository } from '../interfaces/analyze-report.repository';
import { ProducerInterval } from '../../models/producer-interval.model';
import { MovieRepository } from 'src/app/movie/repositories/interfaces/movie.repository';
import { ProducerIntervalsResult } from '../../models/producer-intervals-result.model';

@Injectable()
export class AnalyzeReportInMemory implements AnalyzeReportRepository {
    constructor(private readonly movieRepository: MovieRepository) {}

    async getProducerAwardIntervals(): Promise<ProducerIntervalsResult> {
        const allMovies = await this.movieRepository.getMovies();
        const winningMovies = this.filterWinningMovies(allMovies);
        const producerIntervals = this.calculateProducerIntervals(winningMovies);
        const allIntervals = this.flattenProducerIntervals(producerIntervals);

        return this.getMinMaxIntervals(allIntervals);
    }

    private filterWinningMovies(movies: any[]): any[] {
        return movies.filter((movie) => movie.winner === 'yes');
    }

    private calculateProducerIntervals(winningMovies: any[]): {
        [producer: string]: {
            previousWin: number;
            interval: number;
            followingWin: number;
        }[];
    } {
        const producerIntervals: {
            [producer: string]: {
                previousWin: number;
                interval: number;
                followingWin: number;
            }[];
        } = {};

        winningMovies.forEach((movie) => {
            if (!producerIntervals[movie.producers]) {
                producerIntervals[movie.producers] = [];
            }

            producerIntervals[movie.producers].forEach((interval) => {
                if (movie.year > interval.previousWin) {
                    const newInterval = movie.year - interval.previousWin;
                    producerIntervals[movie.producers].push({
                        previousWin: movie.year,
                        interval: newInterval,
                        followingWin: movie.year,
                    });
                }
            });

            producerIntervals[movie.producers].push({
                previousWin: movie.year,
                interval: 0,
                followingWin: movie.year,
            });
        });

        return producerIntervals;
    }

    private flattenProducerIntervals(producerIntervals: {
        [producer: string]: {
            previousWin: number;
            interval: number;
            followingWin: number;
        }[];
    }): ProducerInterval[] {
        const allIntervals: ProducerInterval[] = [];

        Object.keys(producerIntervals).forEach((producer) => {
            producerIntervals[producer].forEach((interval) => {
                if (interval.interval > 0) {
                    allIntervals.push({
                        producer,
                        interval: interval.interval,
                        previousWin: interval.previousWin,
                        followingWin: interval.followingWin,
                    });
                }
            });
        });

        return allIntervals;
    }

    private getMinMaxIntervals(allIntervals: ProducerInterval[]): ProducerIntervalsResult {
        const minInterval = Math.min(
            ...allIntervals.map((interval) => interval.interval),
        );
        const maxInterval = Math.max(
            ...allIntervals.map((interval) => interval.interval),
        );

        const minIntervals = allIntervals.filter(
            (interval) => interval.interval === minInterval,
        );
        const maxIntervals = allIntervals.filter(
            (interval) => interval.interval === maxInterval,
        );

        return {
            min: minIntervals,
            max: maxIntervals,
        };
    }
}
