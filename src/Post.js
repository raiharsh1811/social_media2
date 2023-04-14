import React, { useEffect, useState } from "react";
import "./App.css";
import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import Comment from "./Comment";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import AddNew from "./AddNew";

function Post({ postId, username, caption, imageurl ,currentuser}) {
  const [comment,setComment]=useState('');

  async function postComment(e){
    e.preventDefalut()

  }

  
//   db.collection("query").doc("postId").collection("comments").get()
// .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//         console.log(doc.id, " => ", doc.data());
//     });
// });

  return (
    <>
      <div className="post">
        <div className="post_header">
    
          <h1>{username}</h1>
        </div>

        <img className="post_image" src={imageurl} alt="logo"></img>
        <h5>
          {username}:{caption}
        </h5>
      </div>
      
      <Comment
        path={`post/${postId}/comments`}
        
      />
      <div>
        {/* <form className="post_comment_box" onSubmit={postComment}>
    <input className="post_input" type="text" placeholder="Add a comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
    <button disabled={!comment} className="post_button" type="submit"></button>
    </form> */}
    <AddNew path={`post/${postId}/comments`} currentuser={currentuser}/>
      </div>

    </>
  );
}

export default Post;
