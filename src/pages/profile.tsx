import { ReactDOM, useContext } from 'react';
import { Box, Button, Text, Title, useStore } from 'zmp-framework/react';
import HotelContext from './hotel/context';
function ProfileDetail() {
  const user = useStore('user');
  const { hotel } = useContext(HotelContext);
  return (
    <>
      <Box m='5'>
        <div className=' font-sans h-screen w-full flex flex-row justify-center items-center'>
          <div className='card w-96 mx-auto bg-white  shadow-xl hover:shadow'>
            <img
              className='w-32 mx-auto rounded-full -mt-20 border-8 border-white'
              src={user.avatar}
              alt=''
            />
            <Title className='text-center mt-2 text-3xl font-medium'>
              {user.name}
            </Title>
            <Title className='text-center mt-2 font-light text-sm'>
              {user.name}
            </Title>
            <div className='text-center font-normal text-lg'>{user.id}</div>
            <div className='px-6 text-center mt-2 font-light text-sm'>
              <p>
                Front end Developer
              </p>
            </div>
            <hr className='mt-8' />
            <div className='flex p-4'>
              <div className='w-1/2 text-center'>
                <span className='font-bold'>1.8 k</span> Followers
              </div>
              <div className='w-0 border border-gray-300'></div>
              <div className='w-1/2 text-center'>
                <span className='font-bold'>2.0 k</span> Following
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default ProfileDetail;
