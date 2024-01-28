# Angular 17 Bike Store Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Demo

[Demo](https://angular-17-bike-store.vercel.app/home)

## Starting up

- Requires Node.js v18+, `.nvmrc` present for version autoload.
- Clone git repo.
- Run `npm i`
- Start up locally `npm run dev:new`
- Without registration we have <http://localhost:3000/home> that gets data from <https://api.open-meteo.com/v1> API.
- Register account. Test login/logout.
- Test adding/removing bikes.

P.S.

- With v1.x both UI and server are now vercel apps
- Previous method still works, but server command moved to sub-folder for full separation of UI and server, and server (command `npm run dev:old`)

Libraries used:

- UI (Angular 17, Angular Material)
  - `Angular 17` latest features, standalone components, service injection, signal variables and component importing
  - `Angular Material` theming option and using all native features to create UI
  - `vercel` for UI deployment

- API (json-server, json-server-auth, @faker-js/faker, request)
  - `vercel` for API deployment
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
