import React from "react";
import PropTypes from "prop-types";

function NotePad(props) {
  return (
    <React.Fragment>
      <ul>
        <div onClick={() => props.whenNoteClicked(props.id)}>
          <h3>{props.title}</h3>
        </div>
      </ul>
    </React.Fragment>
  );
}

NotePad.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  whenNoteClicked: PropTypes.func,
};

export default NotePad;

// notes:
// 9/16/22
//  set up fake data
// pass props
// add propTypes
// add div onClick -> pass down props.whenNoteClicked from NotePadList -> each note will have its own div w/ an onClick handler
