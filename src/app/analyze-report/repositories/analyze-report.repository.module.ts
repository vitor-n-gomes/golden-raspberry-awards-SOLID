import { DynamicModule, Module } from "@nestjs/common";
import { MovieRepositoryModule } from "../../movie/repositories/movie.repository.module";
import { AnalyzeReportInMemoryModule } from "./in-memories/analyze-report.in.memory.module";
import { AnalyzeReportOrmModule } from "./orms/analyze-report.orm.module";

@Module({})
export class AnalyzeReportRepositoryModule {
  static forRoot(): DynamicModule {
    const isTesting = process.env.NODE_ENV === "test";
    return {
      module: MovieRepositoryModule,
      imports: isTesting
        ? [AnalyzeReportInMemoryModule]
        : [AnalyzeReportOrmModule],
      exports: isTesting
        ? [AnalyzeReportInMemoryModule]
        : [AnalyzeReportOrmModule],
    };
  }
}
