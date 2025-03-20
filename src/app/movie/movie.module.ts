import { Module } from '@nestjs/common';
import { MovieUseCaseModule } from './use-cases/movie.use.case.module';
import { MovieRepositoryModule } from './repositories/movie.repository.module';
import { CreateMovieController } from './controllers/create-movie.controller';
import { DeleteMovieController } from './controllers/delete-movie.controller';
import { FindMovieController } from './controllers/find-movie.controller';
import { ListMovieController } from './controllers/list-movie.controller';
import { UpdateMovieController } from './controllers/update-movie.controller';

@Module({
  imports: [MovieUseCaseModule, MovieRepositoryModule],
  controllers: [
    CreateMovieController,
    DeleteMovieController,
    FindMovieController,
    ListMovieController,
    UpdateMovieController,
  ],
})
export class MovieModule {}
