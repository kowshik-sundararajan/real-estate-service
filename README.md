## Real Estate Service

An API only Real Estate Lead Generation service.

Implemented using TypeScript (NestJS framework) with MongoDB as the DB.

The application is hosted on Heroku at https://real-estate-service-kowshik.herokuapp.com.

API documentation is available at `/api` route. 

### Requirements
1. Design and implement storage of following data along with their Insert /Get/Search APIs 
2. Authentication middleware
3. Search all API
4. User login via Facebook using Passport module
  - Facebook requires a user deletion callback URL in order to proceed with the implementation so I did not get around to completing it.


### Installation (assuming node is already installed)

```bash
$ npm install
```

### Running the app

Prerequisites:
1. create a `.env` file using the provided `.env.example`
1. populate the `MONGODB_URI` in your `.env` file with your connection

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Improvements

Given more time I would:
- Add e2e tests
- Complete facebook login
- Expand on the entity schemas
