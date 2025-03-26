import { IsString } from 'class-validator';
import { Movie } from '../../models/movie.model';
import { ApiProperty } from '@nestjs/swagger';

export class FindMovieReqDto implements Partial<Movie> {
  @ApiProperty({ description: 'ID of the movie', example: 1 })
  id: number;
}
