import { Module } from '@nestjs/common';
import { MovieRepository } from './interfaces/movie.repository';
import { MovieInMemory } from './in-memories/movie.in.memory';

@Module({
  providers: [
    {
      provide: MovieRepository,
      useClass: MovieInMemory,
    },
  ],
  exports: [MovieRepository],
})
export class MovieRepositoryModule {}
