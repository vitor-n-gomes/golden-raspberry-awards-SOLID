import { Module } from "@nestjs/common";
import { MovieRepository } from "../interfaces/movie.repository";
import { MovieInMemory } from "./movie.in.memory";
import { ProducerRepository } from "../interfaces/producer.repository";
import { ProducerInMemory } from "./producer.in.memory";
@Module({
  providers: [
    {
      provide: MovieRepository,
      useClass: MovieInMemory,
    },
    {
      provide: ProducerRepository,
      useClass: ProducerInMemory,
    },
  ],
  exports: [MovieRepository, ProducerRepository],
})
export class InMemoryRepositoryModule {}
