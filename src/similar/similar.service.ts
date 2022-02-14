import {HttpException, Injectable} from '@nestjs/common';
import {Logger} from 'nestjs-pino';

const fs = require('fs').promises;
let now = require('nano-time');

@Injectable()
export class SimilarService {
    constructor(private readonly logger: Logger) {
    }
}

export let requestsCounter = 0;
export let totalTime = 0;
export let size;
export let data;
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

(async () => {
    data = await readFromFile();
})();

export const permutation = async (word) => {
    const startTime = now();
    const sortedWord = word.split('').sort();
    let resArray = data[sortedWord];
    if (resArray && resArray.length != 0) {
        resArray = resArray.filter(item => item !== word)
    } else {
        throw new HttpException(
            `There are no similar words for this word: ${word}`,
            404,
        );
    }
    obj = {similar: resArray};
    const endTime = now();
    totalTime += endTime - startTime;
    requestsCounter++;
    return JSON.stringify(obj);
};
