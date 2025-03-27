import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ProducerEntity } from "./producer.entity";

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column({ default: false })
  winner: boolean;

  @ManyToMany(() => ProducerEntity, (producer) => producer.movies, {
    cascade: true,
  })
  @JoinTable()
  producers: ProducerEntity[];
}
