# REPOSITORY ARCHIVED AND IS READ ONLY
The algorithm that I used is: 
1. First get all words from the txt file using readFromFile method.
    1. Get over all words in the dictionary- O(n), n is the number of words
    2. Sort every word from the file, and put it once in the dictionary (O(mlog(m))) m is the length of any word
       In the english language the longest word is about 45 letters, so 45 letters multiple log(45) is O(1).
    3. Go over each word in the DB and add it to list of similar words according to its sorted word.
    4. For each requested word, sort the word and return the array of all its similar words (that we already have from the step before) but not include the word itself.
2. Once I build the dictionary, the words written in this way : { sortedWord : [[all similar words]]}

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development

#start service locally, without docker
$ npm run start 
```

## Notibal APIs
* Swagger
    * UI: ```localhost:8000/api```
    * openapi json spec ```localhost:8080/api-json```
* Root API
    * ```localhost:8000/api/v1/similar```
    * ```localhost:8000/api/v1/stat```
