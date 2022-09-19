import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditNotePadForm(props) {
  const { note } = props;

  function handleEditNoteFormSubmission(event) {
    event.preventDefault();
    props.onEditNote({
      title: event.target.title.value,
      body: event.target.body.value,
      id: note.id
    })
  }
  return (
    <>
      <ReusableForm 
      formSubmissionHandler={handleEditNoteFormSubmission}
      buttonText="Update Note" />
    </>
  );
}

EditNotePadForm.propTypes = {
  note: PropTypes.object,
  onEditNote: PropTypes.func,
}

export default EditNotePadForm;

//note:
// 9/19/22
// import ReusableForm -> return ReusableForm -> pass prop buttonText
// import PropTypes -> add propTypes note & onEditNote
// create function -> handleEditNoteFormSubmission
// pass props from NotePadControl -> note & onEditNote -> add prop types

