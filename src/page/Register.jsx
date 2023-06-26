import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, json, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
function Register() {
  const { AddUser } = useContext(UserContext);
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    id: uuidv4()
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8)
  });

  const createUserMutation = useMutation(AddUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success("Create User !");
      navigate("/login")
    },
    onError: (error) => {
      toast.error('Error :' + error.message);
    },
  });


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

      await createUserMutation.mutateAsync(values);
      resetForm();


    } catch (error) {
      console.error('Failed to create user:', error);
    }
    setSubmitting(false);
  };


  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full bg-slate-400">
        <div className="container m-auto  text-white py-3 flex justify-between">
          <Link to='/' className='px-3 py-2' >Home</Link>
        </div>
      </div>
      <div className="w-[45%] m-auto bg-slate-300 mt-[5%] rounded-lg">
        <h1 className="text-3xl text-center py-3">Register</h1>
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
              Register
            </button>
            <Link to="/login" className="text-red-500 block m-3">
              Login
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
