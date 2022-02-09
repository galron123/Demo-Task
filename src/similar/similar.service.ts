import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
const fs = require('fs').promises;

@Injectable()
export class SimilarService {
  constructor(private readonly logger: Logger) {}
}
export let requestsCounter = 0;
export let totalTime = 0;
export let size;
const readFromFile = async () => {
  let dict = {};
  const data = await fs.readFile('https://github.com/galron123/Palo-Task/blob/main/words_clean.txt', 'utf8');
  let words = data.split("\n");
  size = words.length;
  for (let i = 0; i < words.length; i++) {
    console.log(words[i]);
    if(words[i].charAt(1) == "b"){
      break
    }
    dict[words[i]] = [];
    for (let j = 0; j < words.length; j++) {
      if (i != j && arePermutation(words[i], words[j])) {
        dict[words[i]].push(words[j]);
      }
    }
  }
  return dict;
};

function arePermutation(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return a.split("").sort().join() === b.split("").sort().join();
}
export let data;
(async () => {
  data = await readFromFile();
})();

export const permutation = async (word) => {
  const startTime = Date.now();
  this.logger.debug(`There is no Entites`);console.log(startTime);
  const obj = { similar: data[word] };
  const endTime = Date.now();
  totalTime += endTime - startTime;
  requestsCounter++;
  return JSON.stringify(obj);
};
this.logger.debug(`Find ${count} documents`);
if (!res) {
  this.logger.debug(`There is no Entites`);
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      error: `There is no Entites`,
    },
    HttpStatus.NOT_FOUND,
  );
}
