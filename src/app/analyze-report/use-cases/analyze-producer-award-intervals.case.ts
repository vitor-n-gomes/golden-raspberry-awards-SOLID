import { Injectable } from '@nestjs/common';
import { ProducerIntervalsResult } from '../models/producer-intervals-result.model';
import { AnalyzeReportRepository } from '../repositories/interfaces/analyze-report.repository';

@Injectable()
export class AnalyzeProducerAwardIntervalsUseCase {
  constructor(
    private readonly analyzeReportRepository: AnalyzeReportRepository,
  ) {}

  async execute(): Promise<ProducerIntervalsResult> {
    return await this.analyzeReportRepository.getProducerAwardIntervals();
  }
}
