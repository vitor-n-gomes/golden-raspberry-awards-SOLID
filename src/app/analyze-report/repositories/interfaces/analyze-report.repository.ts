import { ProducerIntervalsResult } from '../../models/producer-intervals-result.model';

export abstract class AnalyzeReportRepository {
  abstract getProducerAwardIntervals(): Promise<ProducerIntervalsResult>;
}
