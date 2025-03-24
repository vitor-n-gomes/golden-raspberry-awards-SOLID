import { Controller, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateMovieCase } from '../use-cases/update-movie.case';
import { UpdateMovieReqDto } from '../dtos/requests/update-movie.req.dto';

@ApiTags('Movies')
@Controller('movies')
export class UpdateMovieController {
  constructor(private readonly useCase: UpdateMovieCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie updated successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async handle(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieReqDto,
  ) {
    return await this.useCase.execute(id, updateMovieDto);
  }
}
