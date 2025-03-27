import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AnalyzeReportRepository } from "../interfaces/analyze-report.repository";
import { MovieEntity } from "../../../movie/repositories/orms/entities/movie.entity";
import { ProducerAward } from "../../models/producer-awards.model";

@Injectable()
export class AnalyzeReportOrm implements AnalyzeReportRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  async getProducerAwardIntervals(): Promise<ProducerAward[]> {
    const query = this.movieRepository
      .createQueryBuilder("movie")
      .innerJoin("movie.producers", "producer")
      .select("producer.name", "producerName")
      .addSelect("movie.year", "movieYear")
      .where("movie.winner = :winner", { winner: true })
      .groupBy("producer.name, movie.year")
      .orderBy("movie.year", "ASC")
      .addOrderBy("producer.name", "ASC");

    const result = await query.getRawMany();

    return result.map((row) => ({
      producerName: row.producerName,
      movieYear: row.movieYear,
    }));
  }
}
