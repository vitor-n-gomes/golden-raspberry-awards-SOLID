import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyzeReportOrm } from "./analyze-report.orm";
import { AnalyzeReportRepository } from "../interfaces/analyze-report.repository";
import { RepositoryOrmModule } from "@/app/movie/repositories/orms/repository.orm.module";
import { MovieEntity } from "@/app/movie/repositories/orms/entities/movie.entity";

@Module({
  imports: [RepositoryOrmModule, TypeOrmModule.forFeature([MovieEntity])],
  providers: [
    {
      provide: AnalyzeReportRepository,
      useClass: AnalyzeReportOrm,
    },
  ],
  exports: [AnalyzeReportRepository],
})
export class AnalyzeReportOrmModule {}
