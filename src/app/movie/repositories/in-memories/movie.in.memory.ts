import { Injectable } from "@nestjs/common";
import { Movie } from "../../models/movie.model";
import { MovieRepository } from "../interfaces/movie.repository";

@Injectable()
export class MovieInMemory implements MovieRepository {
  private static movies: Movie[] = [];

  async getMovies(): Promise<Movie[]> {
    return MovieInMemory.movies;
  }

  async getMovieById(id: number): Promise<Movie> {
    const movie = MovieInMemory.movies.find((movie) => movie.id == id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    return movie;
  }

  async createMovie(movie: Movie): Promise<Movie> {
    movie.id = MovieInMemory.movies.length + 1;
    MovieInMemory.movies.push(movie);
    return movie;
  }

  async addManyMovies(movies: Movie[]): Promise<void> {
    movies.forEach((movie) => {
      this.createMovie(movie);
    });
  }

  async updateMovie(id: number, movie: Movie): Promise<Movie> {
    const index = MovieInMemory.movies.findIndex((m) => m.id == id);
    if (index === -1) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    MovieInMemory.movies[index] = { ...MovieInMemory.movies[index], ...movie };
    return MovieInMemory.movies[index];
  }

  async deleteMovie(id: number): Promise<void> {
    const index = MovieInMemory.movies.findIndex((movie) => movie.id == id);
    if (index === -1) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    MovieInMemory.movies.splice(index, 1);
  }

  async deleteAllMovies(): Promise<void> {
    MovieInMemory.movies = [];
  }
}
