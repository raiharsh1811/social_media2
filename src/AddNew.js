import { doc, setDoc } from "@firebase/firestore";
import React, { useRef } from "react";
import { db } from "./firebase";

export default function AddNew({ path,currentuser }) {
  const name = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const docRef = doc(db, path, name.current.value);
    await setDoc(docRef, { text: name.current.value,username:currentuser });

    e.target.reset();
  }

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <input ref={name} />
        <button type="submit">Add</button>
      </form>
    </li>
  );
}