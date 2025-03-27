import { Module } from "@nestjs/common";
import { AnalyzeProducerAwardIntervalsController } from "./controllers/analyze-producer-award-intervals.controller";
import { AnalyzeReportUseCaseModule } from "./use-cases/analyze-report.use-cases.module";
@Module({
  imports: [AnalyzeReportUseCaseModule],
  controllers: [AnalyzeProducerAwardIntervalsController],
})
export class AnalyzeReportModule {}
