import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../repositories/interfaces/producer.repository';

@Injectable()
export class DeleteProducerCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(id: string): Promise<void> {
    const existingProducer = await this.producerRepository.getProducerById(id);
    if (!existingProducer) {
      throw new Error(`Producer with id ${id} not found.`);
    }

    await this.producerRepository.deleteProducer(id);
  }
}
