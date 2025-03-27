import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { MovieEntity } from "./movie.entity";

@Entity()
export class ProducerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.producers)
  movies: MovieEntity[];
}
