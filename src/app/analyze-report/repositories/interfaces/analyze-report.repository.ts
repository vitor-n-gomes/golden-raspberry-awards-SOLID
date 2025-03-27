import { ProducerAward } from "../../models/producer-awards.model";

export abstract class AnalyzeReportRepository {
  abstract getProducerAwardIntervals(): Promise<ProducerAward[]>;
}
