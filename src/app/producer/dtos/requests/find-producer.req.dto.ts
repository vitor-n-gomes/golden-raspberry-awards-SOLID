import { IsString } from 'class-validator';
import { Producer } from '../../models/producer.model';

export class FindProducerReqDto implements Partial<Producer> {
  @IsString()
  id: string;
}
