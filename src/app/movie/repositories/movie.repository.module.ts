import { Module } from '@nestjs/common';
import { MovieInMemory } from './in-memories/movie.in.memory';
import { MovieRepository } from './interfaces/movie.repository';

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
