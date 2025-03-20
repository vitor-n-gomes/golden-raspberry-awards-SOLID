import { Controller, Get, Param } from '@nestjs/common';
import { ListMovieCase } from '../use-cases/list-movie.case';

@Controller('movies')
export class ListMovieController {
  constructor(private readonly useCase: ListMovieCase) {}

  @Get()
  async handle() {
    return await this.useCase.execute();
  }
}
