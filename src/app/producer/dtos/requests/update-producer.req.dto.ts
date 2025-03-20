import { IsString } from 'class-validator';
import { Producer } from '../../models/producer.model';

export class UpdateProducerReqDto implements Partial<Producer> {
  @IsString()
  name: string;
}
