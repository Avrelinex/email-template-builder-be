## Description
Back end for email template builder.

## Installation

```bash
$ npm install
```

## Run with docker-compose

> Following folders should be in the same directory:
> - email-template-builder-fe
> - email-template-builder-be

```bash
$ docker-compose up
```

## Run without docker

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run mongo db

```bash
docker run --name mongo -p 27017:27017 -d mongo
```

## Test

> For e2e tests and coverage, you need to have a running mongo db instance on port 27017.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Format

```bash
$ npm run format
```

## Lint

```bash
$ npm run lint
```
