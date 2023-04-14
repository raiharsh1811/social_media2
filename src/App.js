import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Registrations from "./Registrations";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Input } from "@mui/material";
import ImageUpload from "./ImageUpload";
function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState("");
  const [userss, setUserss] = useState("");
  
  const [openSignIn, setOpenSignIn] = useState("false");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ids,setIds]=useState([]);
  const colref = collection(db, "post");
  const form = document.querySelector(".form");
  useEffect(() => {
    // db.collection('posts').onSnapshot(snapshot=>{
    //   setPost(snapshot.docs.map(doc=>({
    //     post:doc.data()
    //   })));
    // })
    getDocs(colref)
      .then((snapshot) => {
        console.log(snapshot.docs);
        let posts = [];
        let ids=[];
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
          console.log(posts);
          
          ids.push(doc.id)

        });
        setPost(posts);
        setIds(ids)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
     onAuthStateChanged(auth,(authUser) => {
      if (authUser) {
        setUsers(authUser);
        setUserss(authUser.displayName)
        console.log(userss);
      } else {
        setUsers(null);
      }
    });
  
  }, []);
  const onsubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email,password)
      .then((authUser) => {
       updateProfile(authUser.user,{
        displayName:username
       })
      })
      .catch((err) => {
        console.log(err.message);
      });
      setOpen(false);
      
  };
  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
      .catch((err) => {
        console.log(err.message);
      });
    setOpenSignIn(false);
  };

  return (
    <>
    <ImageUpload username={userss}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <form className="app_signup">
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={onsubmit}>Sign Up</Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <form className="app_signup">
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>

      <div className="app_header">
        <img
          className="app_headerImage"
          src="data:image/png;base64,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"
          alt="logo"
        ></img>
      </div>
      {users ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app_loginConatiner">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      <h1>INSTA</h1>
      {post.map((posts,id) => {
        return (
          <Post
            key={id}
            postId={posts.id}
            currentuser={userss}
            username={posts.username}
            caption={posts.caption}
            imageurl={posts.imageurl}
          />
        );
      })}
      {/* <Post/> */}
    </>
  );
}
export default App;
