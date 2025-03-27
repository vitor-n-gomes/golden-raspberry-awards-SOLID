import { Module, OnModuleInit } from "@nestjs/common";
import { MovieUseCaseModule } from "./use-cases/movie.use.case.module";
import { CreateMovieController } from "./controllers/create-movie.controller";
import { DeleteMovieController } from "./controllers/delete-movie.controller";
import { FindMovieController } from "./controllers/find-movie.controller";
import { ListMovieController } from "./controllers/list-movie.controller";
import { UpdateMovieController } from "./controllers/update-movie.controller";
import { MovieSeed } from "./seeds/movie.seed";

@Module({
  imports: [MovieUseCaseModule],
  providers: [MovieSeed],
  controllers: [
    CreateMovieController,
    DeleteMovieController,
    FindMovieController,
    ListMovieController,
    UpdateMovieController,
  ],
})
export class MovieModule implements OnModuleInit {
  constructor(private readonly movieSeed: MovieSeed) {}

  async onModuleInit() {
    await this.movieSeed.seedFromCSV(
      "src/app/movie/seeds/files/movie-list.csv"
    );
  }
}
