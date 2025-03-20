import { Controller, Get } from '@nestjs/common';
import { ListProducerCase } from '../use-cases/list-producer.case';

@Controller('producers')
export class ListProducerController {
  constructor(private readonly useCase: ListProducerCase) {}

  @Get()
  async handle() {
    return await this.useCase.execute();
  }
}
