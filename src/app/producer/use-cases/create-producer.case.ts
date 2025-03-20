import { Injectable } from '@nestjs/common';
import { Producer } from '../models/producer.model';
import { ProducerRepository } from '../repositories/interfaces/producer.repository';

@Injectable()
export class CreateProducerCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(producerData: Producer): Promise<Producer> {
    const createdProducer = await this.producerRepository.createProducer(
      producerData,
    );
    return createdProducer;
  }
}
