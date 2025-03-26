import { Injectable } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { MovieRepository } from '../repositories/interfaces/movie.repository';
import { NotFoundError } from '@/common/errors/not-found.error';

@Injectable()
export class UpdateMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: number, movieData: Partial<Movie>): Promise<Movie> {
    const existingMovie = await this.movieRepository.getMovieById(id);
    if (!existingMovie) {
      throw new NotFoundError(`Movie with id ${id} not found.`);
    }

    const updatedMovie = await this.movieRepository.updateMovie(id, {
      ...existingMovie,
      ...movieData,
    });

    return updatedMovie;
  }
}
