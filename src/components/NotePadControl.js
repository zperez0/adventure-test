import React, { useEffect, useState } from "react";
import NewNotePadForm from "./NewNotePadForm";
import NotePadDetail from "./NotePadDetail";
import NotePadList from "./NotePadList";
import EditNotePadForm from "./EditNotePadForm";
import { db } from "./../firebase.js";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function NotePadControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainNotePadList, setMainNotePadList] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);


  // ---map() w/ spread operator---

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "lists"),
      (collectionSnapShot) => {
        const notes = collectionSnapShot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setMainNotePadList(notes);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedNote != null) {
      setFormVisibleOnPage(false);
      setSelectedNote(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewNoteToList = async (newNoteData) => {
    const collectionRef = collection(db, "lists");
    await addDoc(collectionRef, newNoteData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedNote = (id) => {
    const selection = mainNotePadList.filter((note) => note.id === id)[0];
    setSelectedNote(selection);
  };

  const handleDeletingNote = async (id) => {
    const noteToDeleteRef = doc(db, "lists", id);
    await deleteDoc(noteToDeleteRef)
    setSelectedNote(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingNoteInList = async (noteToEdit) => {
    const noteRef = doc(db, "lists", noteToEdit.id);
    await updateDoc(noteRef, noteToEdit);
    setSelectedNote(null);
    setEditing(false);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>;
  } else if (editing) {
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
      {error ? null : <button onClick={handleClick}>{buttonText}</button>}
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
// update all of setFormVisibleOnPage -> handleClick -> handleAddingNewNoteToList -> conditional
//  9/20/22
// update mainNotePad state -> selectedNote -> editing
// remove this -> this.handleClick

// -----FIREBASE-----
// import db -> firebase.js
// add data - > import collection & addDoc ->  update add,  functions
// reading firestore data -> set up useEffect -> use/import onSnapshot listener that gets all of the data & adds it to an array -> call setMainNotePadList passing array of notes in order to update mainNotePadList -> displays the updated data
// 9/21/22
// handling errors -> update notes handleEditingNoteInList() w/ updateDoc() -> delete notes handleDeletingNote w/ deleteDoc()




// -----------useEffect()-----------

  // ---forEach()---

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     collection(db, "lists"),
  //     (collectionSnapShot) => {
  //       const notes =[];
  //       collectionSnapShot.forEach((doc) => {
  //         notes.push({
  //           title: doc.data().title,
  //           body: doc.data().body,
  //           createAt: doc.data().createAt,
  //           id: doc.id
  //         })
  //       })
  //       setMainNotePadList(notes)
  //     },
  //     (error) => {
  //       // setError(error.message);
  //     }
  //   )
  //   return () => unSubscribe();
  // }, []);


  // ---forEach() w/ spread operator---

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     collection(db, "lists"),
  //     (collectionSnapShot) => {
  //       const notes =[];
  //       collectionSnapShot.forEach((doc) => {
  //         notes.push({
  //           ...doc.data(),
  //           id: doc.id
  //         })
  //       })
  //       setMainNotePadList(notes)
  //     },
  //     (error) => {
  //       //setError(error.message);
  //     }
  //   )
  //   return () => unSubscribe();
  // }, []);


  // ---map()---

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     collection(db, "lists"),
  //     (collectionSnapShot) => {
  //       const notes = collectionSnapShot.docs.map((doc) => {
  //         return {
  //           title: doc.data().title,
  //           body: doc.data().body,
  //           createAt: doc.data().createAt,
  //           id: doc.id
  //         }
  //       })
  //       setMainNotePadList(notes)
  //     },
  //     (error) => {
  //       // setError(error.message);
  //     }
  //   )
  //   return () => unSubscribe();
  // }, []);