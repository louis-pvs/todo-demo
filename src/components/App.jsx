import React, { Suspense, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../styles/index.scss";
import Loading from "./Loading";
import * as actions from "../states/todo/actions";

const List = React.lazy(() =>
  import(/* webpackChunkName: "lazy/List" */ "./List")
);
const Input = React.lazy(() =>
  import(/* webpackChunkName: "lazy/Input" */ "./Input")
);

App.propTypes = {
  getTodo: PropTypes.func
};

function App({ getTodo }) {
  useEffect(() => {
    getTodo();
  }, []);
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

export default connect(
  null,
  { getTodo: actions.getTodo }
)(App);
