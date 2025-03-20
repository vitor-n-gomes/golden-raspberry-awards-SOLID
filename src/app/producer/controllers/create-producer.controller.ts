import { Controller, Post, Body } from '@nestjs/common';
import { CreateProducerCase } from '../use-cases/create-producer.case';
import { CreateProducerReqDto } from '../dtos/requests/create-producer.req.dto';

@Controller('producers')
export class CreateProducerController {
  constructor(private readonly useCase: CreateProducerCase) {}

  @Post()
  async create(@Body() createProducerDto: CreateProducerReqDto) {
    return await this.useCase.execute(createProducerDto);
  }
}
