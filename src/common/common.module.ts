import { Module } from '@nestjs/common';
import { LoggerModule, Logger } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'webserver',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        prettyPrint: process.env.NODE_ENV !== 'production',
        useLevelLabels: true,
      },
    }),
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class CommonModule {}
