import { Page, useStore, Title, Box, Avatar, Text,zmp,Button } from 'zmp-framework/react';
import { userInfo } from 'zmp-sdk';
import Inquiry, { QuickFilter } from '../components/inquiry';
import React, { useState, useRef, useEffect } from 'react';
import store from '../store';
import HotelItem from '../components/hotel';
import {  HotelList } from '../models';
function Popular(props)
{
  const popular = props.dataHotel;
  // const populars = useStore('populars') as Hotel[];
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
  const user: userInfo = useStore('user')
  const hotelList: HotelList = useStore('hotelList');
  useEffect(() => {
    if (!hotelList?.length)
    {
      store.dispatch('setHotelList');
    }
  }, []);
  const viewProfile = () => {
  zmp.views.main.router.navigate({
      path: '/profile',
    })
  }

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
      <Popular dataHotel={hotelList} />
      <Nearest dataHotel={hotelList} />
    </Page>
  );
}

export default HomePage;
