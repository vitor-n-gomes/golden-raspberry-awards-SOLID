import { ProducerInterval } from '../../models/producer-interval.model';
import { ApiProperty } from '@nestjs/swagger';

export class ProducerIntervalsResponseDto
  implements ProducerInterval
{
  @ApiProperty({ description: 'Name of the producer' })
  producer: string;

  @ApiProperty({ description: 'Interval between wins' })
  interval: number;

  @ApiProperty({ description: 'Year of the previous win' })
  previousWin: number;

  @ApiProperty({ description: 'Year of the following win' })
  followingWin: number;
}
