import { Injectable } from '@nestjs/common';
import { Producer } from '../models/producer.model';
import { ProducerRepository } from '../repositories/interfaces/producer.repository';

@Injectable()
export class UpdateProducerCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(
    id: string,
    producerData: Partial<Producer>,
  ): Promise<Producer> {
    const existingProducer = await this.producerRepository.getProducerById(id);
    if (!existingProducer) {
      throw new Error(`Producer with id ${id} not found.`);
    }

    const updatedProducer = await this.producerRepository.updateProducer(id, {
      ...existingProducer,
      ...producerData,
    });

    return updatedProducer;
  }
}
