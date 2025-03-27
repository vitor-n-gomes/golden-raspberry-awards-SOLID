import { Module } from "@nestjs/common";
import { MovieRepository } from "../interfaces/movie.repository";
import { MovieOrm } from "./movie.orm";
import { ProducerRepository } from "../interfaces/producer.repository";
import { ProducerOrm } from "./producer.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { ProducerEntity } from "./entities/producer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ProducerEntity])],
  providers: [
    {
      provide: MovieRepository,
      useClass: MovieOrm,
    },
    {
      provide: ProducerRepository,
      useClass: ProducerOrm,
    },
  ],
  exports: [MovieRepository, ProducerRepository],
})
export class RepositoryOrmModule {}
