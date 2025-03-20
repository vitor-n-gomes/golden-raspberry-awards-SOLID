import { Injectable } from '@nestjs/common';
import { Movie } from '../../models/movie.model';
import { MovieRepository } from '../interfaces/movie.repository';

@Injectable()
export class MovieInMemory implements MovieRepository {
  private movies: Movie[] = [];

  async getMovies(): Promise<Movie[]> {
    return this.movies;
  }

  async getMovieById(id: string): Promise<Movie> {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    return movie;
  }

  async createMovie(movie: Movie): Promise<Movie> {
    this.movies.push(movie);
    return movie;
  }

  async updateMovie(id: string, movie: Movie): Promise<Movie> {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    this.movies[index] = { ...this.movies[index], ...movie };
    return this.movies[index];
  }

  async deleteMovie(id: string): Promise<void> {
    const index = this.movies.findIndex((movie) => movie.id === id);
    if (index === -1) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    this.movies.splice(index, 1);
  }
}
