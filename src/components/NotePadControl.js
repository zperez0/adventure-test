import React, { useState } from "react";
import NewNotePadForm from "./NewNotePadForm";
import NotePadDetail from "./NotePadDetail";
import NotePadList from "./NotePadList";
import EditNotePadForm from "./EditNotePadForm";

function NotePadControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainNotePadList, setMainNotePadList] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (selectedNote != null) {
      setFormVisibleOnPage(false);
      setSelectedNote(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewNoteToList = (newNote) => {
    const newMainNotePadList = mainNotePadList.concat(newNote);
    setMainNotePadList(newMainNotePadList);
      setFormVisibleOnPage(false);
  };

  const handleChangingSelectedNote = (id) => {
    const selection = mainNotePadList.filter(
      (note) => note.id === id
    )[0];
    setSelectedNote(selection);
  };

  const handleDeletingNote = (id) => {
    const newMainNotePadList = mainNotePadList.filter(
      (note) => note.id !== id
    );
    setMainNotePadList(newMainNotePadList);
    setSelectedNote(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingNoteInList = (noteToEdit) => {
    const editedMainNoteList = mainNotePadList
      .filter((note) => note.id !== selectedNote.id)
      .concat(noteToEdit);
      setMainNotePadList(editedMainNoteList)
      setSelectedNote(null);
      setEditing(false);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (editing) {
    currentlyVisibleState = (
      <EditNotePadForm
        note={selectedNote}
        onEditNote={handleEditingNoteInList}
      />
    );
    buttonText = "Return Home";
  } else if (selectedNote != null) {
    currentlyVisibleState = (
      <NotePadDetail
        note={selectedNote}
        onClickingDelete={handleDeletingNote}
        onClickingEdit={handleEditClick}
      />
    );
    buttonText = "Return Home";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = (
      <NewNotePadForm onNewNoteCreation={handleAddingNewNoteToList} />
    );
    buttonText = "Return Home";
  } else {
    currentlyVisibleState = (
      <NotePadList
        noteList={mainNotePadList}
        onNoteSelection={handleChangingSelectedNote}
      />
    );
    buttonText = "Add Note";
  }
  return (
    <>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </>
  );
}

export default NotePadControl;

// notes:
// 9/16/22
// setup class component

// 9/17/22
// add formVisibleOnPage: false to this.state
// add conditional rendering -> if(this.state.formVisibleOnPage)..
// return {currentlyVisibleState}
// create event handler -> addNotePadButton
// add function associated w/ the event handler -> handleClick()
// to toggle a boolean (the current state to the opposite state) when updating the state -> !prevState.formVisibleOnPage
// replace addNotePadButton w/ buttonText -> to be able to toggle the buttonText based on the state -> "Return Home", etc
// ---- ^^^at this point local state is added^^^ ----

// initialize mainNotePadList as an empty array
// pass mainNotePadList down to NotePadList
// create handleAddingNewNoteToList() -> handles adding a new note
// add a state slice -> selectedNote
// create handleChangingSelectedNote() -> find the specific note -> mutates the state
// update conditional rendering -> add if (this.state.selectedTicket != null)...
// pass method -> onNoteSelection={this.handleChangingSelectedNote}
// update handleClick method -> if (this.state.selectedNote != null)... -> so it can handle returning to the queue from the note detail

// 9/18/22
// create method handleDeletingNote -> set selectedNote to null to ensure that NotePadList is showing
// pass handleDeletingNote method as a prop to NotePadControl -> add to NotePadDetail -> onClickingDelete

// 9/19/22
// add new state slice -> editing: false
// add method for showing the edit form -> handleEditClick() -> console.log("handleEditClick reached!")
// pass handleEditClick as prop to TicketDetail -> onClickingEdit = {this.state.handleEditClick}
// import EditNotePadForm -> add new conditional to render() ->  if(this.state.editing) {...
// add editing: false to handleClick -> in order to return back to home page when on the editing form page
// create method handleEditingNoteInList -> add prop onEditNote = {this.handleEditingNoteInList}

// WIP: fix editing note -> when I edit a title & leave the body blank it does not carry over the OG body. it becomes blank.

// -----HOOKS VERSION-----
// turn the class component NotePadControl into a function component
// turn all state in NotePadControl into state variables -> useState hook
//  turn the class methods into functions -> add const in front -> const handleClick = () => {
// remove render
// import useState hook -> set up formVisibleOnPage state -> const [formVisibleOnPage, setFormVisibleOnPage]...
// update  all of setFormVisibleOnPage -> handleClick -> handleAddingNewNoteToList -> conditional
//  9/20/22
// update mainNotePad state -> selectedNote -> editing
// remove this -> this.handleClick