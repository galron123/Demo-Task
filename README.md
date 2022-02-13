# REPOSITORY ARCHIVED AND IS READ ONLY
The algorithm that I used is: 
1. First get all words from the txt file using readFromFile method.
    1. Get over all words in the dictionary- O(n), n is the number of words
    2. Sort every word from the file, and put it once in the dictionary (O(mlog(m))) m is the length of any word
       In the english language the longest word is about 45 letters, so 45 letters multiple log(45) is O(1)
    3. Go over each sorted word in the array of the similar words in the dictionary, and build a new dictionary without the requested word (the requested word does not appear in results) O(n*k) k is the maximum number of similar words.
2. Once I build the dictionary, the words written in this way : { word : [[all similar words]]}
3. Any request, brings in O(1) all the similar words from the dictionary at once,that is because I already found them before.
In this way I saved processing time.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development

# start mongodb docker
$ docker-compose up -d mongodb
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
