import { Module } from '@nestjs/common';
import { AnalyzeReportRepository } from './interfaces/analyze-report.repository';
import { AnalyzeReportInMemory } from './in-memories/analyze-report.in.memory';
import { MovieRepositoryModule } from '@/app/movie/repositories/movie.repository.module';

@Module({
  providers: [
    {
      provide: AnalyzeReportRepository,
      useClass: AnalyzeReportInMemory,
    },
  ],
  exports: [AnalyzeReportRepository],
  imports: [MovieRepositoryModule],
})
export class AnalyzeReportRepositoryModule {}
