import { Controller, Get, Param } from '@nestjs/common';
import { FindMovieCase } from '../use-cases/find-movie.case';
import { FindMovieReqDto } from '../dtos/requests/find-movie.req.dto';
@Controller('movies')
export class FindMovieController {
  constructor(private readonly useCase: FindMovieCase) {}

  @Get(':id')
  async handle(@Param('id') { id }: FindMovieReqDto) {
    return await this.useCase.execute(id);
  }
}
