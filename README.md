# subgraph-challenge

## Introduction

The application has been implemented with TypeScript and ExpressJS.

There are two different modules:

* api: REST API
* subgraph: module to manage [the subgraph](https://api.thegraph.com/subgraphs/name/javmg/subgraph-registry-subgraph).

## Build

The software needs NodeJS and NPM.

The first step common to the two modules is to install the dependencies:

```
npm install
```

The API module can be built as follows:

```
npm run api-build
```

The subgraph module:

```
npm run subgraph-codegen
npm run subgraph-build
```

## Execution

### Testing

To run the API application tests:

```
npm run api-test
```

To run the Subgraph module tests:

```
npm run subgraph-test
```


### Run (standalone)

To run the API application:

```
npm run api-start
```

The endpoint to retrieve the roles will be placed under:

http://localhost:6060/v1/roles

The subgraph module can be (re)deployed as follows:

```
npm run subgraph-deploy
```

We're synchronizing from block 12858909 (see startBlock in subgraph.yaml)

### Run (with docker)

To build an API image:

```
docker build -t api .
```

To run an API container using the image:

```
docker run --name api -dp 6060:6060 backend-coding-challenge-vyawti-api
```

The endpoint to retrieve the roles will be placed under:

http://localhost:6060/v1/roles

## Limitations

In principle, I think both the API and Subgraph modules should be introduced in different repositories.

In the API module:

* some support has been introduced for environment variables ([dotenv](https://www.npmjs.com/package/dotenv) library) but it should be enhanced so that we can use properties (eg yaml) files. 
* the endpoint to get the roles should allow for filtering, pagination, sorting and so on.
* it'd be a good idea to introduce [OpenAPI](https://swagger.io/specification/) to describe the API.
* there's no security in the API.
* a single test was introduced for demonstration purposes.
