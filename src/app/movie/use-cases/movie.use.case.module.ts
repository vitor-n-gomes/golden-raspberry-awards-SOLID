import { Module } from "@nestjs/common";
import { CreateMovieCase } from "./create-movie.case";
import { UpdateMovieCase } from "./update-movie.case";
import { FindMovieCase } from "./find-movie.case";
import { DeleteMovieCase } from "./delete-movie.case";
import { ListMovieCase } from "./list-movie.case";
import { MovieRepositoryModule } from "../repositories/movie.repository.module";
import { SyncProducerToMoviesCase } from "./sync-producer-to-movies.case";
import { CreateProducerCase } from "./create-producer.case";

@Module({
  providers: [
    CreateMovieCase,
    UpdateMovieCase,
    DeleteMovieCase,
    FindMovieCase,
    ListMovieCase,
    CreateProducerCase,
    SyncProducerToMoviesCase,
  ],
  exports: [
    CreateMovieCase,
    UpdateMovieCase,
    DeleteMovieCase,
    FindMovieCase,
    ListMovieCase,
    CreateProducerCase,
    SyncProducerToMoviesCase,
  ],
  imports: [MovieRepositoryModule.forRoot()],
})
export class MovieUseCaseModule {}
