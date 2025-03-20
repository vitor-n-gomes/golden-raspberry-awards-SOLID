import { IsString, IsInt } from 'class-validator';
import { Producer } from '../../models/producer.model';

export class ProducerItemResponseDto implements Producer {
  @IsString()
  id: string;

  @IsString()
  name: string;

}
