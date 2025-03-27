import { Injectable } from "@nestjs/common";
import { Movie } from "../models/movie.model";
import { MovieRepository } from "../repositories/interfaces/movie.repository";

@Injectable()
export class FindMovieCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: number): Promise<Movie> {
    const movie = await this.movieRepository.getMovieById(id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    return movie;
  }
}
