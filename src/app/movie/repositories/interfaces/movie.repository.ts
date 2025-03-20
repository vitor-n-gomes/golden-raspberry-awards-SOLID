import { Movie } from '../../models/movie.model';

export abstract class MovieRepository {
  abstract getMovies(): Promise<Movie[]>;
  abstract getMovieById(id: string): Promise<Movie>;
  abstract createMovie(movie: Movie): Promise<Movie>;
  abstract updateMovie(id: string, movie: Movie): Promise<Movie>;
  abstract deleteMovie(id: string): Promise<void>;
}
