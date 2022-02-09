import { Module } from '@nestjs/common';
import { SimilarController } from './similar.controller';
import { SimilarService } from './similar.service';

@Module({
  controllers: [SimilarController],
  providers: [SimilarService],
})
export class similarModule {}
