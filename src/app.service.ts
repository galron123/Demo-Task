import { Injectable } from '@nestjs/common';
import { OnApplicationShutdown } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(
    private readonly logger: Logger,
    private configService: ConfigService,
  ) {}

  onApplicationShutdown(signal: string) {
    this.logger.log('Application is shutting down.'); // e.g. "SIGINT"
    this.logger.log(signal); // e.g. "SIGINT"
  }
}
