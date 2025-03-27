import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvModule } from "./app/env/env.module";
import { MovieModule } from "./app/movie/movie.module";
import { AnalyzeReportModule } from "./app/analyze-report/analyze-report.module";
import { Env } from "./app/env/env";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: Env.validate,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./data/awards.sqlite",
      synchronize: true,
      logging: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/migration/**/*.js"],
    }),
    EnvModule,
    MovieModule,
    AnalyzeReportModule,
  ],
})
export class AppModule {}
