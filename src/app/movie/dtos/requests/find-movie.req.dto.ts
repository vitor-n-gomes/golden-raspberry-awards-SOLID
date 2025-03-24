import { IsString } from 'class-validator';
import { Movie } from '../../models/movie.model';
import { ApiProperty } from '@nestjs/swagger';

export class FindMovieReqDto implements Partial<Movie> {
  @ApiProperty({ description: 'ID of the movie', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;
}
