import React, { useEffect, useState } from 'react'
import './App.css'
import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import { doc, setDoc, onSnapshot, getDocs } from "firebase/firestore";
function Comment({path}) {
  const [comment,setComments]=useState([])

    const query = collection(db, path);
    const [docs, loading, error] = useCollectionData(query);
    console.log(docs)
    useEffect(() => {
        // db.collection('posts').onSnapshot(snapshot=>{
        //   setPost(snapshot.docs.map(doc=>({
        //     post:doc.data()
        //   })));
        // })
        getDocs(query)
          .then((snapshot) => {
            console.log(snapshot.docs);
            let posts = [];
            snapshot.docs.forEach((doc) => {
              posts.push(doc.data());
              console.log(posts)
            });
            setComments(posts);
            console.log(comment)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
  return (
    <>
    {/* <div> <ul>
    {docs?.map((doc) => (
      <li key={Math.random()}>{comments}</li>
    ))}
  </ul></div> */}
  {comment.map((comment)=>{
    return(
        <h1>
            {comment.text}
            :{comment.username}
        </h1>
    );
  })
  }
  </>
  
  )
}

export default Comment