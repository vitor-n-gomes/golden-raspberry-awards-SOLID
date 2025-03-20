import { IsString } from 'class-validator';
import { Producer } from '../../models/producer.model';

export class CreateProducerReqDto implements Partial<Producer> {
  @IsString()
  name: string;
}
