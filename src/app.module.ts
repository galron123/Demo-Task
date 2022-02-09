import { Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { RouterModule } from 'nest-router';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { similarModule } from './similar/similar.module';
import { routes } from './routes';
import { CommonModule } from './common/common.module';
import { statModule } from './stat/stat.module';

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 20,
  customLabels: {
    limit: 'size',
  },
};

@Module({
  imports: [
    CommonModule,
    RouterModule.forRoutes(routes),
    TerminusModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mongodb.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    PrometheusModule.register({}),
    similarModule,
    statModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
