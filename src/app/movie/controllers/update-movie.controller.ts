import { Controller, Put, Body, Param } from '@nestjs/common';
import { UpdateMovieCase } from '../use-cases/update-movie.case';
import { UpdateMovieReqDto } from '../dtos/requests/update-movie.req.dto';

@Controller('movies')
export class UpdateMovieController {
  constructor(private readonly useCase: UpdateMovieCase) {}

  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieReqDto,
  ) {
    return await this.useCase.execute(id, updateMovieDto);
  }
}
