import { Movie } from '../../models/movie.model';

export abstract class MovieRepository {
  abstract getMovies(): Promise<Movie[]>;
  abstract getMovieById(id: number): Promise<Movie>;
  abstract createMovie(movie: Movie): Promise<Movie>;
  abstract updateMovie(id: number, movie: Movie): Promise<Movie>;
  abstract deleteMovie(id: number): Promise<void>;
}
