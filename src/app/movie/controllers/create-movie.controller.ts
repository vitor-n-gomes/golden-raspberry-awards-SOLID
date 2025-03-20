import { Controller, Post, Body } from '@nestjs/common';
import { CreateMovieCase } from '../use-cases/create-movie.case';
import { CreateMovieReqDto } from '../dtos/requests/create-movie.req.dto';

@Controller('movies')
export class CreateMovieController {
  constructor(private readonly useCase: CreateMovieCase) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieReqDto) {
    return await this.useCase.execute(createMovieDto);
  }
}
