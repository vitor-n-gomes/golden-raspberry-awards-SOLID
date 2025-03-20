import { Module } from '@nestjs/common';
import { CreateMovieCase } from './create-movie.case';
import { UpdateMovieCase } from './update-movie.case';
import { FindMovieCase } from './find-movie.case';
import { DeleteMovieCase } from './delete-movie.case';
import { ListMovieCase } from './list-movie.case';
import { MovieRepositoryModule } from '../repositories/movie.repository.module';

@Module({
  providers: [
    CreateMovieCase,
    UpdateMovieCase,
    DeleteMovieCase,
    FindMovieCase,
    ListMovieCase,
  ],
  exports: [
    CreateMovieCase,
    UpdateMovieCase,
    DeleteMovieCase,
    FindMovieCase,
    ListMovieCase,
  ],
  imports: [MovieRepositoryModule],
})
export class MovieUseCaseModule {}
