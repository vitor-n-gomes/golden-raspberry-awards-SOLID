import { Module } from '@nestjs/common';
import { ProducerInMemory } from './in-memories/producer.in.memory';
import { ProducerRepository } from './interfaces/producer.repository';

@Module({
  providers: [
    {
      provide: ProducerRepository,
      useClass: ProducerInMemory,
    },
  ],
  exports: [ProducerRepository],
})
export class ProducerRepositoryModule {}
