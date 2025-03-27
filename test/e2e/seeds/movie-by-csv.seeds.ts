import * as fs from "fs";
import * as path from "path";
import { MovieInMemory } from "@/app/movie/repositories/in-memories/movie.in.memory";
import { Movie } from "@/app/movie/models/movie.model";

export default class MovieByCSVSeed {
  static async handle(): Promise<void> {
    try {
      const inMemory = new MovieInMemory();
      const csvFilePath = path.resolve("test/e2e/seeds/files/movie-list.csv");

      const lines = this.readCSVFile(csvFilePath);
      const movies = this.parseCSVLines(lines);

      await inMemory.deleteAllMovies();

      const promise = movies.map(async (movie) => {
        return inMemory.createMovie(movie);
      });

      await Promise.all(promise);

      console.log("Movies successfully seeded from CSV.");
    } catch (error) {
      console.error("Error seeding movies from CSV:", error);
    }
  }

  private static readCSVFile(filePath: string): string[] {
    const data = fs.readFileSync(filePath, "utf-8");
    return data
      .split("\n")
      .filter((line) => line.trim() !== "" && !line.includes("year"));
  }

  private static parseCSVLines(lines: string[]): Movie[] {
    const movies: Movie[] = [];

    lines.forEach((line) => {
      const [year, title, studios, producers, winner] = line.split(";");

      const producersList = producers.split(/, and | and |, /);

      producersList.forEach((producer) => {
        movies.push({
          year: parseInt(year),
          title,
          studios,
          producer: producer,
          winner: winner === "yes",
        } as Movie);
      });
    });

    return movies.sort((a, b) => a.year - b.year);
  }
}
