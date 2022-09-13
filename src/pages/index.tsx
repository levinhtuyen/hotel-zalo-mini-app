import {
  Page,
  useStore,
  Title,
  Box,
  Avatar,
  Text,
  zmp,
  ToastPreloader,
  Preloader
} from 'zmp-framework/react';
import { userInfo } from 'zmp-sdk';
import Inquiry, { QuickFilter } from '../components/inquiry';
import React, { useState, useRef, useEffect } from 'react';
import store from '../store';
import HotelItem from '../components/hotel-item';
import { HotelList } from '../models';
import SkeletonBlockHotel1 from '../components/skeleton-block/skeleton-block-hotel-1';
import SkeletonBlockHotel2 from '../components/skeleton-block/skeleton-block-hotel-2';
function Popular(props)
{
  const popular = props.dataHotel;

  if (props.loadingPopular)
  {
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
              {popular.map((hotel) => (
                <Box
                  key={hotel.sn}
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

function Nearest(props)
{
  const nearests = props.dataHotel;
  const logo = './src/static/icons/logo-app.png';
  if (props.loadingNearest)
  {
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
          {nearests.map((hotel) => (
            <Box key={hotel.sn} mx='0' my='3'>
              <HotelItem
                layout='list-item'
                hotel={hotel}
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

const HomePage = () => {
  const user: userInfo = useStore('user');
  const hotelList: HotelList = useStore('hotelList');
  const hotelPopular = useStore('hotelPopular');
  const hotelNearest = useStore('hotelNearest');
  const loadingNearest = useStore('loadingNearest');
  const loadingPopular = useStore('loadingPopular');
  const [toastLoading, setToastLoading] = useState(true);
  useEffect(() =>
  {
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
  const viewProfile = () => {
    zmp.views.main.router.navigate({
      path: '/profile',
    });
  };
  const openToastLoading = () => {
    setToastLoading(true);
    setTimeout(() => {
      setToastLoading(false);
    }, 500);
  };
  return (
    <Page name='home'>
      <Box mx='4' mb='4' mt='5'>
        <Avatar
          onClick={viewProfile}
          className='shadow align-middle mb-2'
          src={user.avatar}
        >
          Hi
        </Avatar>
        <Text>{user.name ? <>Chào, {user.name}!</> : '...'}</Text>
        <Title size='xlarge' bold>
          Hôm nay bạn muốn ở khách sạn nào?
        </Title>
        <Inquiry />
        <Box flex flexDirection='row' flexWrap mt='0' mb='2'>
          <Title size='small' className='mt-6 mb-4'>
            Phân loại nhanh
          </Title>
        </Box>
        <QuickFilter />
      </Box>
      <Popular loadingPopular={loadingPopular} dataHotel={hotelPopular} />
      <Nearest loadingNearest={loadingNearest} dataHotel={hotelNearest} />
      <ToastPreloader visible={toastLoading} text='Đang tải' />
    </Page>
  );
}

export default HomePage;
