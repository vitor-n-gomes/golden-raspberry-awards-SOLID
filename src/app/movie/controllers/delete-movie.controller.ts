import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteMovieCase } from '../use-cases/delete-movie.case';

@ApiTags('Movies')
@Controller('movies')
export class DeleteMovieController {
  constructor(private readonly useCase: DeleteMovieCase) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async handle(@Param('id') id: string) {
    return await this.useCase.execute(id);
  }
}
