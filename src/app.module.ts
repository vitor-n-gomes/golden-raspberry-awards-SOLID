import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './app/env/env';
import { EnvModule } from './app/env/env.module';
import { MovieModule } from './app/movie/movie.module';
import { ProducerModule } from './app/producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MovieModule,
    ProducerModule
  ],
})
export class AppModule {}
