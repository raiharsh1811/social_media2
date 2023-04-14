import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {db,auth} from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
function Registrations() {
    const form=document.querySelector('.form')
    const onsubmit=(data)=>{
        
        createUserWithEmailAndPassword(auth,data.email,data.password).then((cred)=>{
            console.log("user created",cred.user)
            form.reset();
        }).catch((err)=>{
            console.log(err.message)
        })
    }
  const initialValue = {
    email: "",
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(20).required(),
  });
  return (
    <>
      <div className="createPostPage">
        <Formik
          initialValues={initialValue}
          onSubmit={onsubmit}
          validationSchema={validationSchema}
        >
          <Form className="form">
            <label>Username </label>
            <ErrorMessage name="username" component="span" />

            <Field
              id="inputCreatePost"
              name="username"
              placeholder="{Ex Harsh }"
            />
            <label>Email</label>
            <ErrorMessage name="Email" component="span" />

            <Field
              autocomplete="off"
              id="inputCreatePost"
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <label>Password</label>
            <ErrorMessage name="password" component="span" />

            <Field
              autocomplete="off"
              id="inputCreatePost"
              type="password"
              name="password"
              placeholder="Your Password..."
            />

            <button type="submit" >Register</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Registrations;
