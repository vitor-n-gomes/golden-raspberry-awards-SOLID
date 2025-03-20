import { IsString, IsInt } from 'class-validator';
import { Movie } from '../../models/movie.model';

export class CreateMovieReqDto implements Partial<Movie> {
  @IsInt()
  year: number;

  @IsString()
  title: string;

  @IsString()
  studios: string;

  @IsString()
  producers: string;

  @IsString()
  winner: 'yes' | 'no';
}
