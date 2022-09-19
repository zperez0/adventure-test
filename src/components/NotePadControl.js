import React from "react";
import NewNotePadForm from "./NewNotePadForm";
import NotePadDetail from "./NotePadDetail";
import NotePadList from "./NotePadList";
import EditNotePadForm from "./EditNotePadForm";

class NotePadControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainNotePadList: [],
      selectedNote: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedNote != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedNote: null,
        editing: false,
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  handleAddingNewNoteToList = (newNote) => {
    const newMainNotePadList = this.state.mainNotePadList.concat(newNote);
    this.setState({
      mainNotePadList: newMainNotePadList,
      formVisibleOnPage: false,
    });
  };

  handleChangingSelectedNote = (id) => {
    const selectedNote = this.state.mainNotePadList.filter(
      (note) => note.id === id
    )[0];
    this.setState({ selectedNote: selectedNote });
  };

  handleDeletingNote = (id) => {
    const newMainNotePadList = this.state.mainNotePadList.filter(
      (note) => note.id !== id
    );
    this.setState({
      mainNotePadList: newMainNotePadList,
      selectedNote: null,
    });
  };

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  };

  handleEditingNoteInList = (noteToEdit) => {
    const editedMainNoteList = this.state.mainNotePadList
      .filter(note => note.id !== this.state.selectedNote.id)
      .concat(noteToEdit);
    this.setState({
      mainNotePadList: editedMainNoteList,
      editing: false,
      selectedNote: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = (
        <EditNotePadForm 
        note={this.state.selectedNote}
        onEditNote = {this.handleEditingNoteInList} />
      );
      buttonText = "Return Home";
    } else if (this.state.selectedNote != null) {
      currentlyVisibleState = (
        <NotePadDetail
          note={this.state.selectedNote}
          onClickingDelete={this.handleDeletingNote}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return Home";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewNotePadForm onNewNoteCreation={this.handleAddingNewNoteToList} />
      );
      buttonText = "Return Home";
    } else {
      currentlyVisibleState = (
        <NotePadList
          noteList={this.state.mainNotePadList}
          onNoteSelection={this.handleChangingSelectedNote}
        />
      );
      buttonText = "Add Note";
    }
    return (
      <>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </>
    );
  }
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