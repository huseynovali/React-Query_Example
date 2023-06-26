import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import React, { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { PostContext } from '../Context/PostContext';
import { toast } from 'react-toastify';

function CreatePost({ author }) {
    const queryClient = useQueryClient();
    const userId = JSON.parse(localStorage.getItem("userid"));
    const { AddPost } = useContext(PostContext);
    console.log(author);
    const initialValues = {
        title: '',
        description: '',
        tag: '',
        id: uuidv4(),
        userId,
        author
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


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await createPostMutation.mutateAsync(values);
            resetForm();
        } catch (error) {
            console.error('Failed to create post:', error);
        }
        setSubmitting(false);
    };

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form
                    className="p-10">
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
    )
}

export default CreatePost