import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express';
import helmet from 'helmet';
import useConfigurator from './config';
import * as cors from 'cors';
import * as Sentry from '@sentry/node';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HTTP_ERROR_CODES } from './utils/constants/error';

const { SERVICE_PORT } = useConfigurator();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction,
  ): ExResponse | void {
    if (err) {
      const statusCode = err['statusCode'] ?? 500;

      if (statusCode === HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR) {
        console.error(`Caught Server Error for ${req.path}:`, err);
        Sentry.captureException(err);
      }

      return res.status(statusCode).json({
        message: err['message'],
      });
    }

    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Rest Api Orders')
    .setDescription('Orders')
    .setVersion('1.0')
    .addTag('Rest API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.listen(SERVICE_PORT, () => {
    console.clear();
    console.log(`App is listening on port ${SERVICE_PORT}`);
  });
}

bootstrap();
