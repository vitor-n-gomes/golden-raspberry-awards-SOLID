import { IsString } from 'class-validator';
import { Producer } from '../../models/producer.model';

export class DeleteProducerReqDto implements Partial<Producer> {
  @IsString()
  id: string;
}
