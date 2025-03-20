import { Module } from '@nestjs/common';
import { ProducerUseCaseModule } from './use-cases/producer.use.case.module';
import { ProducerRepositoryModule } from './repositories/producer.repository.module';
import { CreateProducerController } from './controllers/create-producer.controller';
import { DeleteProducerController } from './controllers/delete-producer.controller';
import { FindProducerController } from './controllers/find-producer.controller';
import { ListProducerController } from './controllers/list-producer.controller';
import { UpdateProducerController } from './controllers/update-producer.controller';

@Module({
  imports: [ProducerUseCaseModule, ProducerRepositoryModule],
  controllers: [
    CreateProducerController,
    DeleteProducerController,
    FindProducerController,
    ListProducerController,
    UpdateProducerController,
  ],
})
export class ProducerModule {}
