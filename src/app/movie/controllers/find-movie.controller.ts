import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindMovieCase } from '../use-cases/find-movie.case';

@ApiTags('Movies')
@Controller('movies')
export class FindMovieController {
  constructor(private readonly useCase: FindMovieCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie found.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async handle(@Param('id') id: string) {
    return await this.useCase.execute(id);
  }
}
