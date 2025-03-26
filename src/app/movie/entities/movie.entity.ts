import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Producer } from './producer.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column({ default: false })
  winner: boolean;

  @ManyToMany(() => Producer, (producer) => producer.movies, { cascade: true })
  @JoinTable()
  producers: Producer[];
}
