import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function Register() {
  const initialValues = {
    name: "",
    email: '',
    password: ''
  };


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8)
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      resetForm();
    }, 500);
  };

  return (
    <div>
      <div className=" w-[45%]  m-auto bg-slate-300 mt-[5%] rounded-lg">
        <h1 className='text-3xl text-center py-3'>Register</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="p-10">
            <div className="input__group flex flex-col">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" className="px-1 py-2 rounded-md" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div className="input__group flex flex-col">
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" className="px-1 py-2 rounded-md" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="input__group flex flex-col mt-3">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" className="px-1 py-2 rounded-md" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="px-5 py-2 bg-slate-500 text-white rounded-md mt-2">
              Login
            </button>
            <Link to="/login" className="text-red-500 block m-3">
              Login
            </Link>
          </Form>
        </Formik>

      </div>
    </div>
  )
}

export default Register