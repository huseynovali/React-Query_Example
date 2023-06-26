import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { PostContext } from '../Context/PostContext';
import { UserContext } from '../Context/UserContext';

function AdminPage() {
  const { getUserById } = useContext(UserContext);
  const { getPostsByUserId, AddPost, deletePostById } = useContext(PostContext);
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userid"));
  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery('users', () =>
    getUserById(userId)
  );

  const { data: postData, isLoading: isPostLoading, error: postError } = useQuery('posts', () =>
    getPostsByUserId(userId)
  );


  const initialValues = {
    title: '',
    description: '',
    tag: '',
    id: uuidv4(),
    userId
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3),
    description: Yup.string().required('Description is required')
  });

  const createPostMutation = useMutation(AddPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success("Create Post !");
    },
    onError: (error) => {
      toast.error('Error :' + error.message);
    },
  });
  const deletePostMutation = useMutation(deletePostById, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success("Delete Post !");
    },
    onError: (error) => {
      toast.error('Error :' + error.message);
    },
  });


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createPostMutation.mutateAsync(values);
      resetForm();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
    setSubmitting(false);
  };

  const deletePost = async (id) => {
    if(confirm("are you sure !")){
       try {
      await deletePostMutation.mutateAsync(id);
      console.log("delete Post !");
    } catch (error) {
      console.error('Failed to create post:', error);
    }
    }
    return 0
   

  }



  return (
    <div className='flex justify-between p-5'>
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
      {
        isUserLoading ? <p>Loading...</p>
          :
          <>

            <div className="user__account w-[20%] border p-5">
              <div className="account__img  w-full flex justify-center">
                <img src="http://cdn.onlinewebfonts.com/svg/img_376901.png" alt="" className='w-[150px]' />
              </div>
              <div className="user__info">
                <p className='py-5'>Name: {userData?.data.name}</p>
                <p className='py-5'>Email: {userData?.data.email}</p>
              </div>
            </div>
            <div className="user__activity w-[70%]">
              <div className="create__post w-full border p-5 d">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  <Form className="p-10">
                    <div className="input__group flex flex-col">
                      <Field type="text" id="title" name="title" className='border rounded-md p-2 my-2 outline-none' placeholder="Title" />
                      <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>
                    <div className="input__group flex flex-col mt-3">
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        cols="20"
                        rows="10"
                        className='border rounded-md p-2 my-2 outline-none resize-none'
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                    <div className="input__group flex flex-col">
                      <Field type="text" id="tag" name="tag" className='border rounded-md p-2 my-2 outline-none' placeholder="Tag" />
                      <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>
                    <button type="submit" className='px-3 py-2 bg-green-400 rounded-md text-white'>Create</button>

                  </Form>
                </Formik>

              </div>
              <div className="post__list w-full border p-5 mt-3 ">
                <h1 className='text-xl my-5'>Your Posts</h1>
                <div className="list grid grid-cols-3 gap-2">
                  {
                    isPostLoading ?
                      <h1>Loading...</h1> :
                      postData.data.map(item => {
                        let tags = item.tag.split(',').map(element => '#' + element.trim()).join(" , ")


                        return (
                          <div className=" card border p-2 relative min-h-[250px]">
                            <h1 className='text-xl font-medium mb-2'>{item.title}</h1>
                            <p className='text-lg  mb-2'>{item.description.length > 100 ? (item.description.substr(0, 120) + " ...") : item.description}</p>
                            <span className='text-blue-500 cursor-pointer'>{tags}</span>
                            <div className="card__buttons absolute bottom-3">
                              <button onClick={() => deletePost(item.id)} className='px-3 py-2 bg-red-400 rounded-md text-white mr-2'>Delete</button>
                              <button onClick={() => editPost(item.id)} className='px-3 py-2 bg-yellow-400 rounded-md text-white'>Edit</button>
                            </div>
                          </div>
                        )
                      })
                  }
                </div>

              </div>
            </div>
          </>
      }

    </div>
  )
}

export default AdminPage;
