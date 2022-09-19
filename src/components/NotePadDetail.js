import React from "react";
import PropTypes from "prop-types"

function NotePadDetail(props) {
  const { note, onClickingDelete, onClickingEdit } = props;

  return (
    <>
      <h1>Note Detail</h1>
      <h2>{note.title}</h2>
      <h3>{note.body}</h3>
      <button onClick={ onClickingEdit }>Update Note</button>
      <button onClick={() => onClickingDelete(note.id) }>Delete Note</button>
    </>
  );
}

NotePadDetail.propTypes = {
  note: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
}

export default NotePadDetail;


// notes:
// object destructuring -> const { note } -> can use {note.title} otherwise {props.note.title}
// pass props from NotePadControl -> note -> add prop type
// 9/19/22
// pass prop onClickingDelete from NotePadControl -> add button to delete note -> add prop types
// pass prop onClickingEdit from NotePadControl -> add edit/update button -> add prop types 