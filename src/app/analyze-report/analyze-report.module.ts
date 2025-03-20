import { Module } from '@nestjs/common';
import { AnalyzeProducerAwardIntervalsController } from './controllers/analyze-producer-award-intervals.controller';
import { AnalyzeReportRepositoryModule } from './repositories/analyze-report.repository.module';
import { AnalyzeReportUseCaseModule } from './use-cases/analyze-report.use-cases.module';
@Module({
  imports: [AnalyzeReportUseCaseModule, AnalyzeReportRepositoryModule],
  controllers: [AnalyzeProducerAwardIntervalsController],
})
export class AnalyzeReportModule {}
