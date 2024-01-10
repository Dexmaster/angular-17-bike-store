# Angular 17 Bike Store Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Starting up

- Requires Node.js v18+, `.nvmrc` present for version autoload.
- Clone git repo.
- Run `npm i`. (during this step if `./server/db.json` doesn't exists it will create it and populate with fake products)
- Start up server `npm run server`. (Fake api will be at <http://localhost:4208/>)
- Start up client `ng serve`. (Your UI will be at <http://localhost:4209/>)
- Without registration we have <http://localhost:4208/home> that gets data from <https://api.open-meteo.com/v1> API.
- Register account. Test login/logout.
- Test adding/removing bikes.

Libraries used:

- UI (Angular 17, Angular Material)
  - `Angular 17` latest features, standalone components, service injection, signal variables and component importing
  - `Angular Material` theming option and using all native features to create UI

- API (json-server, json-server-auth, @faker-js/faker, request)
  - `json-server` has all functions we need for request processing and data storage (data is stored in `./server/db.json`)
  - `json-server-auth` helps with providing levels of access needed to access API (route rules stored in `./server/routes.json`)
  - `@faker-js/faker` is used to generate large amount of specific data
  - `request` helps with fetching final URL path from random url

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
