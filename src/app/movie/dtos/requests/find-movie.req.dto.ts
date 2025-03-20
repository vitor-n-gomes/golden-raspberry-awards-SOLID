import { IsString } from 'class-validator';
import { Movie } from '../../models/movie.model';

export class FindMovieReqDto implements Partial<Movie> {
  @IsString()
  id: string;
}
