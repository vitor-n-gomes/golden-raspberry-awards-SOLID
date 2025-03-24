import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Golden Raspberry Awards API')
    .setDescription('API documentation for Golden Raspberry Awards')
    .setVersion('1.0')
    .addTag('Movies')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerFilePath = path.resolve(__dirname, '../swagger.json');
  fs.writeFileSync(swaggerFilePath, JSON.stringify(document, null, 2), 'utf-8');

  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  console.log(`Application is running on: http://localhost:${port}/api-docs`); // Log Swagger URL
  console.log(`Swagger file generated at: ${swaggerFilePath}`);
  await app.listen(port);
}
bootstrap();
