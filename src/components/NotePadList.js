import React from "react";
import NotePad from "./NotePad";
import PropTypes from "prop-types";

function NotePadList(props) {
  

  return (
    <>
      <h2>List</h2>
      {props.noteList.map((note) => (
        <NotePad 
        whenNoteClicked = { props.onNoteSelection }
        title={note.title} 
        body={note.body}
        id={note.id}
        key={note.id} />
      ))}
    </>
  );
}

NotePadList.propTypes = {
  noteList: PropTypes.array,
  onNoteSelection: PropTypes.func
}

export default NotePadList;

// notes:
  //  add <NotePad />
  // set up props ex: title={}
  // add fake data -> mainNotePadList
// 9/17/22
  // remove mainNotePadList
  // add props -> pass noteList down through props -> add prop type
  // pass prop -> props.onNoteSelection -> add prop whenNoteClicked to pass prop to NotePad
