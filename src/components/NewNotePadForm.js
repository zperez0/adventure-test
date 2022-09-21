import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function NewNotePadForm(props) {

  function handleNewNoteFormSubmission(event) {
    event.preventDefault()
    props.onNewNoteCreation({
      title: event.target.title.value,
      body: event.target.body.value,
    })
  }
  return (
    <>
    <ReusableForm 
      formSubmissionHandler={handleNewNoteFormSubmission}
      buttonText="Submit" />
    </>
  );
}

NewNotePadForm.propTypes = {
  onNewNoteCreation: PropTypes.func
}

export default NewNotePadForm;

// notes:
  // 9/16/22
    // add basic form
    // import PropTypes
  // 9/17/22
    // update button text to submit
    // add an event handler -> onSubmit={handleNewNoteFormSubmission} -> when a form is submitted it will trigger the function handleNewNoteFormSubmission
    // create handleNewNoteFormSubmission() -> don't want the page to refresh - prevent the default behavior: add event.preventDefault()
    // to check the value of the fields ->   console.log(event.target.title.value) , console.log(event.target.body.value)
    // add props -> pass onNewNoteCreation down through props -> add prop type 
    // add callback function -> props.onNewNoteCreation() -> create an object w/ all of the properties
    // if property is a integer use parseInt -> ex: numberOfStudents: parseInt(event.target.numberOfStudents.value)
    // import v4() -> id

    // 9/19/22
    // remove form -> add ReusableForm -> pass props formSubmissionHandler & buttonText

    // 9/20/22
    // remove v4 -> firebase will handle the id