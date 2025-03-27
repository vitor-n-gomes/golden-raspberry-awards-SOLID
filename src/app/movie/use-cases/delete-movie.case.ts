import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../repositories/interfaces/movie.repository";
import { NotFoundError } from "@/common/errors/not-found.error";

@Injectable()
export class DeleteMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: number): Promise<void> {
    const existingMovie = await this.movieRepository.getMovieById(id);
    if (!existingMovie) {
      throw new NotFoundError(`Movie with id ${id} not found.`);
    }

    await this.movieRepository.deleteMovie(id);
  }
}
