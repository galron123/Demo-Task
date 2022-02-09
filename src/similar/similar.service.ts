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
    'words_clean.txt',
    'utf8',
  );
  const words = data.split('\n');
  size = words.length;
  for (let i = 0; i < words.length; i++) {
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
  return a.split('').sort().join() === b.split('').sort().join();
}
export let data;
(async () => {
  data = await readFromFile();
})();

export const permutation = async (word) => {
  const startTime = Date.now();
  try {
    obj = { similar: data[word] };
  } catch (err) {
    throw new HttpException(`There is no such file: ${err}`, 400);
  }
  const endTime = Date.now();
  totalTime += endTime - startTime;
  requestsCounter++;
  const results = JSON.stringify(obj);
  if (!data[word]) {
    throw new HttpException(
      `There are no similar words for this word: ${word}`,
      404,
    );
  } else {
    return results;
  }
};
