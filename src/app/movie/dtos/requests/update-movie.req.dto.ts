import { IsString, IsInt, IsOptional } from 'class-validator';
import { Movie } from '../../models/movie.model';

export class UpdateMovieReqDto implements Partial<Movie> {
  @IsInt()
  year: number;

  @IsString()
  title: string;

  @IsString()
  studios: string;

  @IsString()
  producers: string;

  @IsOptional()
  @IsString()
  winner: 'yes';
}
