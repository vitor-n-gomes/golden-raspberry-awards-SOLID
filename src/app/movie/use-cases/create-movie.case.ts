import { Injectable } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { MovieRepository } from '../repositories/interfaces/movie.repository';

@Injectable()
export class CreateMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(movieData: Movie): Promise<Movie> {
    const createdMovie = await this.movieRepository.createMovie(movieData);
    return createdMovie;
  }
}
