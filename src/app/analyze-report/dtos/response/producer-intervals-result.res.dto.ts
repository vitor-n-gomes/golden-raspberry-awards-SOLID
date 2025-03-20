import { ProducerIntervalsResult } from '../../models/producer-intervals-result.model';
import { ProducerInterval } from '../../models/producer-interval.model';

export class ProducerIntervalsResultResponseDto
  implements ProducerIntervalsResult
{
  min: ProducerInterval[];
  max: ProducerInterval[];
}
