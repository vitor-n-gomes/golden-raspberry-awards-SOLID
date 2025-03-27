import { Module } from "@nestjs/common";
import { AnalyzeReportRepository } from "../interfaces/analyze-report.repository";
import { AnalyzeReportInMemory } from "./analyze-report.in.memory";
import { InMemoryRepositoryModule } from "../../../movie/repositories/in-memories/in.memory.repository.module";

@Module({
  providers: [
    {
      provide: AnalyzeReportRepository,
      useClass: AnalyzeReportInMemory,
    },
  ],
  exports: [AnalyzeReportRepository],
  imports: [InMemoryRepositoryModule],
})
export class AnalyzeReportInMemoryModule {}
