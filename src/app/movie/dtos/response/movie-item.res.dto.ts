import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { Movie } from '../../models/movie.model';

export class MovieItemResponseDto implements Movie {
  @IsString()
  id: string;

  @IsInt()
  year: number;

  @IsString()
  title: string;

  @IsString()
  studios: string;

  @IsString()
  producers: string;

  @IsOptional()
  @IsBoolean()
  winner: boolean;
}
