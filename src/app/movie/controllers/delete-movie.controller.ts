import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteMovieCase } from '../use-cases/delete-movie.case';
import { DeleteMovieReqDto } from '../dtos/requests/delete-movie.req.dto';

@Controller('movies')
export class DeleteMovieController {
  constructor(private readonly useCase: DeleteMovieCase) {}

  @Delete(':id')
  async handle(@Param('id') { id }: DeleteMovieReqDto) {
    return await this.useCase.execute(id);
  }
}
