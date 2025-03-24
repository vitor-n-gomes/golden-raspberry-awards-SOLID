import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { Movie } from '../../models/movie.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieReqDto implements Partial<Movie> {
  @ApiProperty({ description: 'Year of the movie', example: 1994 })
  @IsInt()
  year: number;

  @ApiProperty({ description: 'Title of the movie', example: 'The Shawshank Redemption' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Studios involved in the movie', example: 'Castle Rock Entertainment' })
  @IsString()
  studios: string;

  @ApiProperty({ description: 'Producers of the movie', example: 'Niki Marvin' })
  @IsString()
  producers: string;

  @ApiProperty({ description: 'Indicates if the movie is a winner', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  winner: boolean;
}
