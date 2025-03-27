import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProducerEntity } from "./entities/producer.entity";
import { ProducerRepository } from "../interfaces/producer.repository";
import { MovieEntity } from "./entities/movie.entity";

@Injectable()
export class ProducerOrm implements ProducerRepository {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly producerRepository: Repository<ProducerEntity>
  ) {}

  deleteAllProducers(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getProducers(): Promise<ProducerEntity[]> {
    return await this.producerRepository.find({ relations: ["movies"] });
  }

  async getProducerById(id: number): Promise<ProducerEntity> {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ["movies"],
    });
    if (!producer) {
      throw new Error(`Producer with id ${id} not found.`);
    }
    return producer;
  }

  async createProducer(producer: ProducerEntity): Promise<ProducerEntity> {
    return await this.producerRepository.save(producer);
  }

  async updateProducer(
    id: number,
    producer: Partial<ProducerEntity>
  ): Promise<ProducerEntity> {
    await this.producerRepository.update(id, producer);
    return await this.getProducerById(id);
  }

  async deleteProducer(id: number): Promise<void> {
    const result = await this.producerRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Producer with id ${id} not found.`);
    }
  }

  async syncMoviesToProducer(
    producerId: number,
    movies: MovieEntity[]
  ): Promise<void> {
    const producer = await this.getProducerById(producerId);
    if (!producer) {
      throw new Error(`Producer with id ${producerId} not found.`);
    }
    producer.movies = movies;
    await this.producerRepository.save(producer);
  }
}
