import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProducerCase } from '../use-cases/delete-producer.case';
import { DeleteProducerReqDto } from '../dtos/requests/delete-producer.req.dto';

@Controller('producers')
export class DeleteProducerController {
  constructor(private readonly useCase: DeleteProducerCase) {}

  @Delete(':id')
  async handle(@Param('id') { id }: DeleteProducerReqDto) {
    return await this.useCase.execute(id);
  }
}
