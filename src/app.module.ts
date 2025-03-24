import { Module } from '@nestjs/common';
import { EnvModule } from './app/env/env.module';
import { MovieModule } from './app/movie/movie.module';
import { AnalyzeReportModule } from './app/analyze-report/analyze-report.module';
import { ConfigModule } from '@nestjs/config';
import { Env } from './app/env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: Env.validate,
      isGlobal: true,
    }),
    EnvModule,
    MovieModule,
    AnalyzeReportModule,
  ],
})
export class AppModule {}
