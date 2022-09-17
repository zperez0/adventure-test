import React from "react";
import NotePad from "./NotePad";

function NotePadList() {
  const mainNotePadList = [
    {
      title: "Gear",
      body: "tent, backpack, tarp",
    },
    {
      title: "food",
      body: "protein bars, oatmeal, trail mix",
    },
  ];

  return (
    <>
      <h2>List</h2>
      {mainNotePadList.map((note, index) => (
        <NotePad title={note.title} body={note.body} key={index} />
      ))}
    </>
  );
}

export default NotePadList;

// notes:
  //  add <NotePad />
  // set up props ex: title={}
  // add fake data -> mainNotePadList
