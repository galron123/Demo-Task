import { HttpException, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
const fs = require('fs').promises;

@Injectable()
export class SimilarService {
  constructor(private readonly logger: Logger) {}
}
export let requestsCounter = 0;
export let totalTime = 0;
export let size;
let obj;
const readFromFile = async () => {
  const dict = {};
  const data = await fs.readFile(
    './words_clean.txt',
    'utf8',
  );
  const words = data.split('\n');
  size = words.length;
  for (let i = 0; i < words.length; i++) {
    const sortedWord = words[i].split('').sort();
    if (!dict[sortedWord]) {
      dict[sortedWord] = [];
    }
    dict[sortedWord].push(words[i]);
  }
  return dict;
};

export let data;
(async () => {
  data = await readFromFile();
})();

export const permutation = async (word) => {
  const startTime = Date.now();
  const sortedWord = word.split('').sort();
  try {
    obj = { similar: data[sortedWord] };
  } catch (err) {
    throw new HttpException(`There is no such file: ${err}`, 400);
  }
  const endTime = Date.now();
  totalTime += endTime - startTime;
  requestsCounter++;
  const results = JSON.stringify(obj);
  if (!data[sortedWord]) {
    throw new HttpException(
      `There are no similar words for this word: ${word}`,
      404,
    );
  } else {
    return results;
  }
};
