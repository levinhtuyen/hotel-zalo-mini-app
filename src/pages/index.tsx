import {
  Page,
  useStore,
  Title,
  Box,
  Avatar,
  Text,
  ToastPreloader,
  Preloader,
  zmp,
} from 'zmp-framework/react';
import { userInfo } from 'zmp-sdk';
import Inquiry, { QuickFilter } from '../components/inquiry';
import HotelItem from '../components/restaurant';
import { Restaurant, HotelList } from '../models';
import React, { useEffect, useState } from 'react';
import { useCurrentRoute } from '../hooks';
import {
  hideNavigationBar,
  showNavigationBar,
} from '../components/navigation-bar';
import store from '../store'
import SkeletonBlockHotel2 from '../components/skeleton-block/skeleton-block-hotel-2'
import SkeletonBlockHotel1 from '@components/skeleton-block/skeleton-block-hotel-1';

function Popular(props) {
  // const populars = useStore('populars') as Restaurant[];
  const popular = props.dataHotel;
  if (props.loadingPopular) {
    return (
      <>
        <Box mx='4' mt='6'>
          <Title size='small'>Khách sạn phổ biến</Title>
        </Box>
        <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
          <Box m='0' pr='4' flex className='w-max'>
            <SkeletonBlockHotel2 />
            <SkeletonBlockHotel2 />
            <SkeletonBlockHotel2 />
          </Box>
        </div>
      </>
    );
  }
  return (
    <>
      <Box mx='4' mt='6'>
        <Title size='small'>Khách sạn phổ biến</Title>
      </Box>
      {popular.length ? (
        <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
          <Box m='0' pr='4' flex className='w-max'>
            {popular.map((hotel, index) => (
              <Box
                key={index}
                ml='4'
                mr='0'
                className='snap-start'
                style={{ width: 'calc(100vw - 120px)' }}
              >
                <HotelItem layout='cover' hotel={hotel} />
              </Box>
            ))}
          </Box>
        </div>
      ) : (
        <Box mx='4'>Không có khách sạn nào ở khu vực này</Box>
      )}
    </>
  );
}

function Nearest(props) {
  const nearests = props.dataHotel;
  const logo = 'https://go2joy.vn/images/logo-mini.png';
  if (props.loadingNearest) {
    return (
      <>
        <Box mx='4' mt='5'>
          <Title size='small'>Gần bạn nhất</Title>
          <Box mx='4' mt='5'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Preloader logo={logo} />
            </div>
          </Box>
          <SkeletonBlockHotel1 />
          <SkeletonBlockHotel1 />
          <SkeletonBlockHotel1 />
        </Box>
      </>
    );
  }
  return (
    <>
      {nearests.length ? (
        <Box mx='4' mt='5'>
          <Title size='small'>Gần bạn nhất</Title>
          {nearests.map((hotel,index) => (
            <Box key={index} mx='0' my='3'>
              <HotelItem
                layout='list-item'
                hotel={hotel}
                key={index}
                after={
                  <Text size='small' className='text-gray-500'>
                    {hotel.address}
                  </Text>
                }
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box mx='4'>Không có khách sạn nào ở khu vực này</Box>
      )}
    </>
  );
}

const HomePage = () =>
{
  const hotelList = useStore('hotelList');
  const user: userInfo = useStore('user')
  const hotelPopular = useStore('hotelPopular');
  const hotelNearest = useStore('hotelNearest');
  const loadingNearest = useStore('loadingNearest');
  const loadingPopular = useStore('loadingPopular');
  const [toastLoading, setToastLoading] = useState(true);
  const [currentRoute] = useCurrentRoute();
  useEffect(() => {
    openToastLoading();
    if (!hotelList?.length) {
      store.dispatch('setHotelList');
    }
  }, []);
  useEffect(() => {
    if (!hotelPopular?.length) {
      store.dispatch('getHotelPopular', {
        bookingType: 1,
        limit: 20,
        sort: 2,
        page: 1,
        provinceSn: 1,
        maxPrice: 10000000,
        minPrice: 20000,
      });
    }
  }, []);
  useEffect(() => {
    if (!hotelNearest?.length) {
      store.dispatch('getHotelNearest', {
        bookingType: 1,
        limit: 20,
        sort: 1,
        page: 1,
        provinceSn: 1,
        maxPrice: 10000000,
        minPrice: 20000,
      });
    }
  }, []);
  const openToastLoading = () => {
    setToastLoading(true);
    setTimeout(() => {
      setToastLoading(false);
    }, 500);
  };
  const directToProfile = () => {
    currentRoute.path.startsWith('/profile');
    zmp.views.current?.router.navigate({
      path: '/profile'
    });
  }
  return (
    <Page
      name='home'
      onPageBeforeIn={showNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      <Box mx='4' mb='4' mt='5'>
        <Avatar className='shadow align-middle mb-2' onClick={directToProfile} src={user.avatar}>
          Hi
        </Avatar>
        <Text>{user.name ? <>Chào, {user.name}!</> : '...'}</Text>
        <Title size='xlarge' bold>
          Hôm nay bạn muốn ăn ở đâu?
        </Title>
        <Inquiry />
        <Title size='small' className='mt-6 mb-4'>
          Phân loại nhanh
        </Title>
        <QuickFilter />
      </Box>
      <Popular loadingPopular={loadingPopular} dataHotel={hotelPopular} />
      <Nearest loadingNearest={loadingNearest} dataHotel={hotelNearest} />
      <ToastPreloader visible={toastLoading} text='Đang tải' />
    </Page>
  );
}

export default HomePage;
