import { MovieInMemory } from "@/app/movie/repositories/in-memories/movie.in.memory";
import { mockMoviesOnlyWinners } from "./mocks/movie.mocks";

export default class MovieByMockSeed {
  static async handle(): Promise<void> {
    try {
      const inMemory = new MovieInMemory();

      const promise = mockMoviesOnlyWinners.map(async (movie) => {
        return inMemory.createMovie(movie);
      });

      await Promise.all(promise);

      console.log("Movies successfully seeded from MOCK.");
    } catch (error) {
      console.error("Error seeding movies from MOCK:", error);
    }
  }
}
