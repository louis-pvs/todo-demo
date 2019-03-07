import { from, combineLatest } from "rxjs";
import { map, catchError } from "rxjs/operators";

const { NODE_ENV } = process.env;
const envConfig = require("../../firebase.key." + NODE_ENV);

export function lazyLoadFirebase(config = envConfig) {
  const firebase$ = from(
    import(/* webpackChunkName: "@firebase" */ "@firebase/app")
  );
  const firestore$ = from(
    import(/* webpackChunkName: "@firebase" */ "@firebase/firestore")
  );
  const rxfire$ = from(
    import(/* webpackChunkName: "rxfire" */ "rxfire/firestore")
  );
  return combineLatest(firebase$, rxfire$, firestore$).pipe(
    map(([{ firebase }, rxfire]) => {
      const app = firebase.apps[0] || firebase.initializeApp(config);
      return { app, rxfire };
    }),
    catchError(err => {
      err;
    })
  );
}
