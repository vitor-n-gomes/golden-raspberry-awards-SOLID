import { MovieRepository } from "@/app/movie/repositories/interfaces/movie.repository";
import { Injectable } from "@nestjs/common";
import { AnalyzeReportRepository } from "../interfaces/analyze-report.repository";
import { ProducerAward } from "../../models/producer-awards.model";

@Injectable()
export class AnalyzeReportInMemory implements AnalyzeReportRepository {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getProducerAwardIntervals(): Promise<ProducerAward[]> {
    const movies = await this.movieRepository.getMovies();

    return movies
      .filter((movie) => movie.winner === true)
      .map((movie) => {
        return {
          producerName: movie.producer,
          movieYear: movie.year,
        };
      });
  }
}
