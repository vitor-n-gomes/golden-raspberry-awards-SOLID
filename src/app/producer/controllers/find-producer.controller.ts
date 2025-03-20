import { Controller, Get, Param } from '@nestjs/common';
import { FindProducerCase } from '../use-cases/find-producer.case';
import { FindProducerReqDto } from '../dtos/requests/find-producer.req.dto';
@Controller('producers')
export class FindProducerController {
  constructor(private readonly useCase: FindProducerCase) {}

  @Get(':id')
  async handle(@Param('id') { id }: FindProducerReqDto) {
    return await this.useCase.execute(id);
  }
}
