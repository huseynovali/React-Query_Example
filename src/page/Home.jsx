import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import { PostContext } from '../Context/PostContext';
import { useQuery } from 'react-query';

function Home() {
  const { getPost, AddPost, deletePostById } = useContext(PostContext);
  const { data: postData, isLoading: isPostLoading, error: postError } = useQuery('posts', () =>
    getPost()
  );


  return (
    <div>
      <div className="list grid grid-cols-3 gap-2 p-5">
        {
          postError ? <p>{postError.message}</p> :
            isPostLoading ?
              <h1>Loading...</h1> :
              postData?.data?.map(item => {
                let tags = item.tag?.split(',').map(element => '#' + element.trim()).join(" , ")
                return (
                  <div className=" card border p-2 relative min-h-[250px]">
                    <h1 className='text-xl font-medium mb-2'>{item.title}</h1>
                    <p className='text-lg  mb-2'>{item.description?.length > 100 ? (item.description.substr(0, 120) + " ...") : item.description}</p>
                    <p className='text-lg  mb-2'>Author : {item.author}</p>
                    <span className='text-blue-500 cursor-pointer absolute bottom-3'>{tags}</span>

                  </div>
                )
              })
        }
      </div>

    </div>
  )
}

export default Home