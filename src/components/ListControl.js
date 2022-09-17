import React, { useState, useEffect } from "react";
import { db } from "./../firebase.js";
import { collection, getDocs } from "firebase/firestore";

function ListControl() {
    const [lists, setLists] = useState([]);
    const listsRef = collection(db, "lists");
  
    useEffect(() => {
      const getLists = async () => {
        const listsSnapshot = await getDocs(listsRef);
        // console.log(data);
        setLists(listsSnapshot.doc.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(listsSnapshot);
      };
  
      getLists();
    }, []);

    // useEffect(() => {
    //   const getLists = async () => {
    //     const listsSnapshot = await getDocs(collection(db, "lists"));
    //     // console.log(data);
    //     setLists(listsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     console.log(listsSnapshot);
    //   };
  
    //   getLists();
    // }, []);
  
  
    return (
      <React.Fragment>
        {lists.map((list) => {
            <div key={list.id}>
              <h1>Title: {list.title}</h1>
              <h2>Body: {list.body}</h2>
              <h3>Created: {list.createAt}</h3>
            </div>
        })}
      </React.Fragment>
    );
  }

export default ListControl;


// function ListControl() {
//   const [lists, setLists] = useState([]);
//   const listsRef = collection(db, "lists");

//   useEffect(() => {
//     const getLists = async () => {
//       const data = await getDocs(listsRef);
//       // console.log(data);
//       setLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     getLists();
//   }, []);

//   return (
//     <div>
//       {lists.map((list) => {
//         return (
//           <div>
//             {" "}
//             <h1>Title: {list.title}</h1>
//             <h2>Body: {list.body}</h2>
//             <h3>Created: {list.createAt}</h3>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ListControl;
