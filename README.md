# REPOSITORY ARCHIVED AND IS READ ONLY
The algorithm that I used is: 
1. First get all words from the txt file using readFromFile method.
2. Once I have it all, put them in a dictionary this way : { word : [[all similar words]]}
3. Any request, brings in O1 all the similar words from the dictionary at once,that is because I already found them before.
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
    * UI: ```localhost:8080/api```
    * openapi json spec ```localhost:8080/api-json```
* Root API
    * ```localhost:8080/api/v1/similar```
    * ```localhost:8080/api/v1/stat```
