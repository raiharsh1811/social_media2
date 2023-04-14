import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
const imageListRef = ref(storage, "images/");
function ImageUpload(username) {
  const [caption, setCaption] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const colref = collection(db, "post");
  const [progresspercent, setProgresspercent] = useState(0);
  const [imagelist, setImagelist] = useState([]);
  const imageListRef = ref(storage, "images/");
  // const handleChange=(e)=>{
  //     if(e.target.files[0]){
  //         setImageUpload(e.target.files[0])
  //     }
  // }
  // const metadata = {
  //     contentType: 'image/jpeg'
  //   };
    const addform=document.querySelector('.form')
    const uploadingAll=(e)=>{
        e.preventDefault();
        addDoc(colref, {
            caption: caption,
            imageurl: imgUrl,
            username:username.username
          })
          setCaption("")
          setProgress(0)
          
    }
  // Upload file and metadata to the object 'images/mountains.jpg'
  //   const storageRef = ref(storage, 'images/' + file.name);
  //   const uploadTask = uploadBytesResumable(storageRef, file, metadata)
  const handleSubmit = (e) => {
    // const uploadTask = storage.ref(`images/${imageUpload.name}`).put(imageUpload)

    // uploadTask.on(
    //     "state_changed",
    //     (snapshot)=>{
    //         const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
    //         setProgress(progress)
    //     },
    //     (err)=>{
    //         console.log(err);
    //         alert(err.message)
    //     },
    //     ()=>{
    //         storage.ref("images").child(imageUpload.name).getDownloadURL().then(url=>{
    //             getDocs(colref).add({

    //                 //timestamp:firebase.firestore.FieldValue.serverTimestamp()
    //                 caption:caption,
    //                 imageUrl:url,
    //                 username:username

    //             })
    //         })
    //     }

    // )
    // if(imageUpload==null) return;
    // const imageRef=ref(storage,`images/${imageUpload.name +v4()}`);
    // uploadBytes(imageRef,imageUpload).then(()=>{
    //     alert("Image uploaded");
    // })
    // }
    // const uploadimage=()=>{
    //     try{ listAll(imageListRef).then((response)=>{
    //         response.items.forEach((item)=>{
    //             getDownloadURL(item).then((url)=>{
    //                 addDoc(colref,{
    //                                     caption:caption,
    //                                     imageurl:url,
    //                                     username:username.username

    //                                 })
    //             })
    //         } )
    //     })}catch(err){
    //         console.log(err.message)
    //     }

    // }
    // useEffect(()=>{
    //     uploadimage()

    //     },[])
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      },
    //   () => {
    //     addDoc(colref, {
    //       caption: caption,
    //       imageurl: imgUrl,
    //       username: username.username,
    //     });
    //   }
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input type="file" />
        <input type="text" placeholder="caption" onChange={event=>setCaption(event.target.value)} value={caption}  />
        <button type="submit">Upload</button>
      </form>
      {imgUrl &&(
        <form onSubmit={uploadingAll}>
            <button type="submit">Confirm</button>
        </form>
      )

      }
      {!imgUrl && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      {/* <input type='text' placeholder='enter caption' onChange={event=>setCaption(event.target.value)} value={caption}/>
<input type='file' onChange={handleChange}/>
<Button onClick={handleUpload}>Upload</Button> */}
    </>
  );
}

export default ImageUpload;
