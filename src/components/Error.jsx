import React from "react";
import PropTypes from "prop-types";
import "../styles/index.scss";

Error.propTypes = {
  msg: PropTypes.string.isRequired
};

export default function Error({ msg }) {
  return <p className="app__errorMessage">{msg}</p>;
}
