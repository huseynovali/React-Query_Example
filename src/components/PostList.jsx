import React, { useContext, useEffect } from 'react'
import { PostContext } from '../Context/PostContext';
import { isError, useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

function PostList() {
    const userId = JSON.parse(localStorage.getItem("userid"));
    const queryClient = useQueryClient();

    const { getPostsByUserId, AddPost, deletePostById } = useContext(PostContext);
    const { data: postData, isLoading: isPostLoading, error: postError } = useQuery('posts', () =>
        getPostsByUserId(userId)
    );

    const deletePostMutation = useMutation(deletePostById, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
            toast.success("Delete Post !");
        },
        onError: (error) => {
            toast.error('Error :' + error.message);
        },
    });


    const deletePost = async (id) => {
        if (confirm("are you sure !")) {
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
        <div>
            <h1 className='text-xl my-5'>Your Posts</h1>
            <div className="list grid grid-cols-3 gap-2">
                {
                    postError ?  <p>{postError.message}</p> :
                    isPostLoading ?
                        <h1>Loading...</h1> :
                        postData.data?.map(item => {
                            let tags = item.tag?.split(',').map(element => '#' + element.trim()).join(" , ")


                            return (
                                <div className=" card border p-2 relative min-h-[250px]">
                                    <h1 className='text-xl font-medium mb-2'>{item.title}</h1>
                                    <p className='text-lg  mb-2'>{item.description?.length > 100 ? (item.description.substr(0, 120) + " ...") : item.description}</p>
                                    <p className='text-lg  mb-2'>Author : {item.author}</p>
                                    <span className='text-blue-500 cursor-pointer'>{tags}</span>
                                    <div className="card__buttons absolute bottom-3">
                                        <button onClick={() => deletePost(item.id)} className='px-3 py-2 bg-red-400 rounded-md text-white mr-2'>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default PostList