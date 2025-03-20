import { IsString } from 'class-validator';
import { Movie } from '../../models/movie.model';

export class DeleteMovieReqDto implements Partial<Movie> {
  @IsString()
  id: string;
}
