import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as hpropagate from 'hpropagate';
import { AppModule } from './app.module';

async function bootstrap() {
  hpropagate({
    setAndPropagateCorrelationId: false,
    headersToPropagate: [
      'x-reality-id',
      'x-correlation-id',
      'x-variant-id',
      'x-request-id',
      'x-b3-traceid',
      'x-b3-spanid',
      'x-b3-parentspanid',
      'x-b3-sampled',
      'x-b3-flags',
      'x-ot-span-context',
      'x-cloud-trace-context',
      'traceparent',
      'grpc-trace-bin',
    ],
    propagateInResponses: true,
  });

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('paloTask')
    .setDescription('The paloTask API description')
    .setVersion('1.0')
    .addTag('paloTask')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
