import { Injectable } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { MovieRepository } from '../repositories/interfaces/movie.repository';

@Injectable()
export class ListMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(): Promise<Movie[]> {
    const movie = await this.movieRepository.getMovies();
    return movie;
  }
}
