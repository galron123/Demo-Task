import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { size, requestsCounter, totalTime } from '../similar/similar.service';
@Injectable()
export class StatService {
  constructor(private readonly logger: Logger) {}
}

export const stats = async () => {
  const count = requestsCounter;
  const numberOfWords = size;
  let avgProcessingTime = totalTime / requestsCounter;
  if (!avgProcessingTime) {
    avgProcessingTime = 0;
  }
  const obj = {
    totalWords: numberOfWords,
    totalRequests: count,
    avgProcessingTime: avgProcessingTime,
  };
  return JSON.stringify(obj);
};
