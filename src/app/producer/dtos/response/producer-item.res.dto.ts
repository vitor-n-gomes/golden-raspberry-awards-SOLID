import { IsString, IsInt, IsOptional } from 'class-validator';
import { Producer } from '../../models/producer.model';

export class ProducerItemResponseDto implements Producer {
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
  winner: string;
}
