export abstract class MovieRepository {
  abstract getMovies(): Promise<any[]>;
  abstract getMovieById(id: number): Promise<any>;
  abstract createMovie(movie: any): Promise<any>;
  abstract updateMovie(id: number, movie: Partial<any>): Promise<any>;
  abstract deleteMovie(id: number): Promise<void>;
}
