import React from "react";
import PropTypes from "prop-types";

function NotePad(props) {
  const list = "Gear";

  return (
    <React.Fragment>
      <ul>
          <h3>Title: {props.title}</h3>
          <h3>Body: {props.body}</h3>
      </ul>
    </React.Fragment>
  );
}

NotePad.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}

export default NotePad;