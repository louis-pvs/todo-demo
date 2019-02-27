A demo To-do application made with `react` and `firebase`, [live demo here](http://louis-vincent.me/todo)

### Using this repo
after clone this repo, run `yarn` or `npm install` to install dependencies

### Start the app in production mode
run `yarn build:prod` and `yarn start:prod`, or manually run `node ./dist/server/index.bundle.js` in server console after build, at the date of writing this app is hosted in [digitalocean](https://www.digitalocean.com) persisted with [pm2](http://pm2.keymetrics.io/).

### Start dev server in local
`yarn build:dev` and `yarn start:dev`

### file structure
```javascript
src
  |- components // view of the app, UI
  |- styles // where all the stylesheets lies
  |- services // effects / business logic
  |- state // states that not stored in the component it self
  |- index.ejs // html markup
  |- index.js // compile entry point, do modify webpack config if you wish to relocate or rename
```
> for webpack setup/configuration checkout boilerplate [expect](https://github.com/louis-pvs/expack)

### @todo
- Replace `firebase.key.production.js` with your actually firebase key, and add it into `.gitignore`.
- Unit test services reliability
- Add git hook to automate the deployment and CI
- State lib implement, expectation:
  - the current functionality of caching state locally should remain at the current job scope, eventhough redux persist is one of the option.
  - it will replace react hook
- rxjs should replacing the current way of handling asynchronous, and side effects
