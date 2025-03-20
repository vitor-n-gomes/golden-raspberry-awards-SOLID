import { Controller, Put, Body, Param } from '@nestjs/common';
import { UpdateProducerCase } from '../use-cases/update-producer.case';
import { UpdateProducerReqDto } from '../dtos/requests/update-producer.req.dto';

@Controller('producers')
export class UpdateProducerController {
  constructor(private readonly useCase: UpdateProducerCase) {}

  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerReqDto,
  ) {
    return await this.useCase.execute(id, updateProducerDto);
  }
}
