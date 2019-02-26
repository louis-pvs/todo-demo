import React, { Suspense } from "react";
import "../styles/index.scss";

import Loading from "./Loading";
const List = React.lazy(() =>
  import(/* webpackChunkName: "lazy/List" */ "./List")
);
const Input = React.lazy(() =>
  import(/* webpackChunkName: "lazy/Input" */ "./Input")
);
export default function App() {
  return (
    <div className="app">
      <h1 className="app__headline">To-Do App!</h1>
      <h4 className="app__subheadline">Add New To-Do</h4>
      <Suspense fallback={<Loading />}>
        <Input />
        <List />
      </Suspense>
    </div>
  );
}
