import { Injectable } from "@nestjs/common";
import { ProducerIntervalsResult } from "../models/producer-intervals-result.model";
import { AnalyzeReportRepository } from "../repositories/interfaces/analyze-report.repository";
import { generateSlug } from "@/common/utils/generate-slug.util";
import { ProducerInterval } from "../models/producer-interval.model";
import { findMinAndMaxInterval } from "@/common/utils/find-min-max-interval.util";
import { ProducerAward } from "../models/producer-awards.model";

@Injectable()
export class AnalyzeProducerAwardIntervalsUseCase {
  constructor(
    private readonly analyzeReportRepository: AnalyzeReportRepository
  ) {}

  async execute(): Promise<ProducerIntervalsResult> {
    const result =
      await this.analyzeReportRepository.getProducerAwardIntervals();

    const producerMovies = this.groupMoviesByProducer(result);
    const allIntervals = this.calculateIntervals(producerMovies);

    return this.getMinMaxIntervals(allIntervals);
  }

  private groupMoviesByProducer(
    result: ProducerAward[]
  ): Record<string, ProducerAward[]> {
    const producerMovies: Record<string, ProducerAward[]> = {};

    result.forEach((row) => {
      const producerSlug = generateSlug(row.producerName);

      if (!producerMovies[producerSlug]) {
        producerMovies[producerSlug] = [];
      }

      producerMovies[producerSlug].push(row);
    });

    return producerMovies;
  }

  private calculateIntervals(
    producerMovies: Record<string, ProducerAward[]>
  ): ProducerInterval[] {
    const allIntervals: ProducerInterval[] = [];

    Object.values(producerMovies)
      .filter((movies) => movies.length > 1)
      .forEach((movies) => {
        const { min, max } = findMinAndMaxInterval(
          movies.map((award) => award.movieYear)
        );

        allIntervals.push({
          producer: movies[0].producerName,
          interval: min[1] - min[0],
          previousWin: min[0],
          followingWin: min[1],
        });

        max.forEach((maxInterval) => {
          if (maxInterval[1] !== min[1]) {
            allIntervals.push({
              producer: movies[0].producerName,
              interval: maxInterval[1] - maxInterval[0],
              previousWin: maxInterval[0],
              followingWin: maxInterval[1],
            });
          }
        });
      });

    return allIntervals;
  }

  private getMinMaxIntervals(
    allIntervals: ProducerInterval[]
  ): ProducerIntervalsResult {
    const minInterval = Math.min(
      ...allIntervals.map((interval) => interval.interval)
    );
    const maxInterval = Math.max(
      ...allIntervals.map((interval) => interval.interval)
    );

    return {
      min: allIntervals.filter((interval) => interval.interval === minInterval),
      max: allIntervals.filter((interval) => interval.interval === maxInterval),
    };
  }
}
