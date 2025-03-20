import { Module } from '@nestjs/common';
import { CreateProducerCase } from './create-producer.case';
import { UpdateProducerCase } from './update-producer.case';
import { FindProducerCase } from './find-producer.case';
import { DeleteProducerCase } from './delete-producer.case';
import { ListProducerCase } from './list-producer.case';
import { ProducerRepositoryModule } from '../repositories/producer.repository.module';

@Module({
  providers: [
    CreateProducerCase,
    UpdateProducerCase,
    DeleteProducerCase,
    FindProducerCase,
    ListProducerCase,
  ],
  exports: [
    CreateProducerCase,
    UpdateProducerCase,
    DeleteProducerCase,
    FindProducerCase,
    ListProducerCase,
  ],
  imports: [ProducerRepositoryModule],
})
export class ProducerUseCaseModule {}
