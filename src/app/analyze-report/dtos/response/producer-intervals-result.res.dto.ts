import { ProducerIntervalsResult } from '../../models/producer-intervals-result.model';
import { ProducerInterval } from '../../models/producer-interval.model';
import { ApiProperty } from '@nestjs/swagger';

export class ProducerIntervalsResultResponseDto
  implements ProducerIntervalsResult
{
  @ApiProperty({
    description: 'List of producers with the minimum intervals between awards',
    type: [ProducerInterval],
    example: [
      { producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 },
    ],
  })
  min: ProducerInterval[];

  @ApiProperty({
    description: 'List of producers with the maximum intervals between awards',
    type: [ProducerInterval],
    example: [
      { producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 },
    ],
  })
  max: ProducerInterval[];
}
