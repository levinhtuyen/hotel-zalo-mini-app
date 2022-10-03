
import { Title, useStore, Page } from 'zmp-framework/react';
import api from 'zmp-sdk';
import { useEffect } from 'react';
import {
  showNavigationBar,
} from '../components/navigation-bar';
function ProfileDetail() {
  const user = useStore('user');
  let numberPhone: any = ''
  const getNumberPhone = () => new Promise(() => {
    api.getPhoneNumber({
      success: (data) => {
        // xử lý khi gọi api thành công
        numberPhone = data;
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });
  })
  const getProfile = async () => {
    try {
      await api.openProfile({
        type: 'oa',
        id: 'oa-id'
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  useEffect(() => {
    getNumberPhone();
    getProfile()
  }, [])
  return (
    <Page
      onPageBeforeIn={showNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      <div className=' font-sans h-screen w-full flex flex-row justify-center'>
          <div className='card w-96 mx-auto shadow-xl hover:shadow'>
            <img
              className='w-32 mx-auto rounded-full border-8 border-white'
              src={user.avatar}
              alt=''
            />
            <Title className='text-center mt-2 text-3xl font-medium'>
              {user.name}
            </Title>
            <Title className='text-center mt-2 font-light text-sm'>
              { numberPhone }
            </Title>
            <div className='text-center font-normal text-lg'>{user.id}</div>
            <div className='px-6 text-center mt-2 font-light text-sm'>
              <p>Career</p>
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
    </Page>
  );
}

export default ProfileDetail;
