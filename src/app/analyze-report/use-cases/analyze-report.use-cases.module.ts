import { Module } from "@nestjs/common";
import { AnalyzeProducerAwardIntervalsUseCase } from "./analyze-producer-award-intervals.case";
import { AnalyzeReportRepositoryModule } from "../repositories/analyze-report.repository.module";

@Module({
  providers: [AnalyzeProducerAwardIntervalsUseCase],
  exports: [AnalyzeProducerAwardIntervalsUseCase],
  imports: [AnalyzeReportRepositoryModule.forRoot()],
})
export class AnalyzeReportUseCaseModule {}
