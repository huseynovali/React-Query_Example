import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { UserContext } from '../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const createUserMutation = useMutation(login, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
      toast.success("Login !");
      localStorage.setItem("token", JSON.stringify(data.email + uuidv4()))
      localStorage.setItem("userid", JSON.stringify(data.id))
      navigate("/")
    },
    onError: (error) => {
      toast.error('Error :' + error.message);
    },
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    createUserMutation.mutate(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div>
      <div className="w-full bg-slate-400">
        <div className="container m-auto  text-white py-3 flex justify-between">
          <Link to='/' className='px-3 py-2' >Home</Link>
        </div>
      </div>
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
      <div className="w-[45%] m-auto bg-slate-300 mt-[5%] rounded-lg">
        <h1 className="text-3xl text-center py-3">Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="p-10">
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
            <Link to="/register" className="text-red-500 block m-3">
              Register
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
