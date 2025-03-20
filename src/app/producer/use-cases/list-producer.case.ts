import { Injectable } from '@nestjs/common';
import { Producer } from '../models/producer.model';
import { ProducerRepository } from '../repositories/interfaces/producer.repository';

@Injectable()
export class ListProducerCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(): Promise<Producer[]> {
    const producer = await this.producerRepository.getProducers();
    return producer;
  }
}
