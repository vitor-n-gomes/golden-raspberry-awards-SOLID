import { Injectable } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { MovieRepository } from '../repositories/interfaces/movie.repository';

@Injectable()
export class UpdateMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const existingMovie = await this.movieRepository.getMovieById(id);
    if (!existingMovie) {
      throw new Error(`Movie with id ${id} not found.`);
    }

    const updatedMovie = await this.movieRepository.updateMovie(id, {
      ...existingMovie,
      ...movieData,
    });

    return updatedMovie;
  }
}
