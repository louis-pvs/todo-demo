import { from, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

const { NODE_ENV } = process.env;
const envConfig = require("../../firebase.key." + NODE_ENV);

export function lazyLoadFirebase(config = envConfig) {
  const firebase$ = from(import("@firebase/app"));
  const firestore$ = from(import("@firebase/firestore"));
  const rxfire$ = from(import("rxfire/firestore"));
  return combineLatest(firebase$, firestore$, rxfire$).pipe(
    map(([{ firebase }, __, rxfire]) => {
      const app = firebase.apps[0] || firebase.initializeApp(config);
      return { app, rxfire };
    })
  );
}
