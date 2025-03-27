import * as fs from "fs";
import * as path from "path";
import { CreateMovieCase } from "../use-cases/create-movie.case";
import { Injectable } from "@nestjs/common";
import { CreateProducerCase } from "../use-cases/create-producer.case";
import { Movie } from "../models/movie.model";
import { SyncProducerToMoviesCase } from "../use-cases/sync-producer-to-movies.case";
import { MovieEntity } from "../repositories/orms/entities/movie.entity";
import { generateSlug } from "../../../common/utils/generate-slug.util";
@Injectable()
export class MovieSeed {
  constructor(
    readonly createMovie: CreateMovieCase,
    readonly createProducer: CreateProducerCase,
    readonly syncProducerToMovie: SyncProducerToMoviesCase
  ) {}

  async seedFromCSV(filePath: string): Promise<void> {
    try {
      const lines = this.readCSVFile(filePath);
      const producerMovies = this.parseCSVLines(lines);

      await this.processProducersAndMovies(producerMovies);

      console.log("Movies successfully seeded from CSV.");
    } catch (error) {
      console.error("Error seeding movies from CSV:", error);
    }
  }

  private readCSVFile(filePath: string): string[] {
    const absolutePath = path.resolve(filePath);
    const data = fs.readFileSync(absolutePath, "utf-8");
    return data
      .split("\n")
      .filter((line) => line.trim() !== "" && !line.includes("year"));
  }

  private parseCSVLines(
    lines: string[]
  ): Record<string, { producer: string; movies: Movie[] }> {
    const producerMovies: Record<
      string,
      { producer: string; movies: Movie[] }
    > = {};

    lines.forEach((line) => {
      const [year, title, studios, producer, winner] = line.split(";");

      const movie: Movie = {
        year: parseInt(year),
        title,
        studios,
        winner: winner == "yes",
      };

      const producers = producer.split(/, and | and |, /);

      producers.forEach((producer) => {
        const producerSlug = generateSlug(producer);

        if (!producerMovies[producerSlug]) {
          producerMovies[producerSlug] = {
            producer: producer,
            movies: [],
          };
        }
        producerMovies[producerSlug].movies.push(movie);
      });
    });

    return producerMovies;
  }

  private async processProducersAndMovies(
    producerMovies: Record<string, { producer: string; movies: Movie[] }>
  ): Promise<void> {
    for (const item of Object.values(producerMovies)) {
      const producer = await this.createProducer.execute({
        name: item.producer,
      });
      const movieEntities: MovieEntity[] = [];

      for (const itemMovie of item.movies) {
        const savedMovie = (await this.createMovie.execute({
          ...itemMovie,
        })) as MovieEntity;
        movieEntities.push(savedMovie);
      }

      await this.syncProducerToMovie.execute(producer.id, movieEntities);
    }
  }
}
