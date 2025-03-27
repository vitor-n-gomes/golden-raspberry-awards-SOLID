import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { MovieRepository } from "../interfaces/movie.repository";

@Injectable()
export class MovieOrm implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  async getMovies(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({ relations: ["producers"] });
  }

  async getMovieById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["producers"],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    return movie;
  }

  async createMovie(movie: MovieEntity): Promise<MovieEntity> {
    return await this.movieRepository.save(movie);
  }

  async updateMovie(
    id: number,
    movie: Partial<MovieEntity>
  ): Promise<MovieEntity> {
    await this.movieRepository.update(id, movie);
    return await this.getMovieById(id);
  }

  async deleteMovie(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Movie with id ${id} not found.`);
    }
  }
}
