import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';

function AdminPage() {
  const { getUserById } = useContext(UserContext);
  const userId = JSON.parse(localStorage.getItem("userid"));
  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery('users', () =>
    getUserById(userId)
  );

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

        userError ? <p>{userError.message}</p> :
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
                  <CreatePost author={userData.data.name} />
                </div>
                <div className="post__list w-full border p-5 mt-3 ">
                  <PostList />
                </div>
              </div>
            </>
      }

    </div>
  )
}

export default AdminPage;
