import { Injectable } from '@nestjs/common';
import { Producer } from '../models/producer.model';
import { ProducerRepository } from '../repositories/interfaces/producer.repository';

@Injectable()
export class FindProducerCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(id: string): Promise<Producer> {
    const producer = await this.producerRepository.getProducerById(id);
    if (!producer) {
      throw new Error(`Producer with id ${id} not found.`);
    }
    return producer;
  }
}
