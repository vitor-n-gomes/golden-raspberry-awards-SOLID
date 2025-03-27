import { Injectable } from "@nestjs/common";
import { ProducerRepository } from "../repositories/interfaces/producer.repository";

@Injectable()
export class SyncProducerToMoviesCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(producerId: number, movies: any[]): Promise<void> {
    await this.producerRepository.syncMoviesToProducer(producerId, movies);
  }
}
