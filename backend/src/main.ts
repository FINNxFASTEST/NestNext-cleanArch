import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Auto-validate all incoming DTOs using class-validator decorators
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger UI at /api
  const config = new DocumentBuilder()
    .setTitle('Cross-Domain Architecture Example')
    .setDescription(
      'Demonstrates: EventEmitter pattern for cross-domain side effects + @Global SharedModule for shared services.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`\n🚀 Server running on http://localhost:${port}`);
  console.log(`📖 Swagger docs at http://localhost:${port}/api\n`);
}
bootstrap();
