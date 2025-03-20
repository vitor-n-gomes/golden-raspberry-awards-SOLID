import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repositories/interfaces/movie.repository';

@Injectable()
export class DeleteMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<void> {
    const existingMovie = await this.movieRepository.getMovieById(id);
    if (!existingMovie) {
      throw new Error(`Movie with id ${id} not found.`);
    }

    await this.movieRepository.deleteMovie(id);
  }
}
