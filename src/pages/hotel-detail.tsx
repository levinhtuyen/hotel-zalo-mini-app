import { Box, Page, useStore, zmp, Button } from 'zmp-framework/react';
import { useRestaurant } from '../hooks';
import {
  hideNavigationBar,
  showNavigationBar,
} from '../components/navigation-bar';
import HotelContext from './restaurant/context';
import RestaurantDetail from './restaurant/detail';
import React, { useEffect, useState } from 'react';
import ListReview from '@components/review/reviews';
import RoomList from '../components/room-list'
import store from '../store';
function HotelDetailPage({ zmproute }) {
  const query = {
    bookingType: zmproute.query.bookingType,
    hotelSn: zmproute.query.hotelSn,
  };
  useEffect(() => {
    if (!hotelDetail?.length) {
      store.dispatch('getHotelDetail', query);
    }
  }, []);
  const hotelDetail: any = useStore('hotelDetail');
  const loading = useStore('loadingHotelDetail');
  const onClickBookNow = (data) => {
    zmp.views.current?.router.navigate({
      path: '/booking-list',
    })
  }
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      
      <HotelContext.Provider value={{ hotelDetail }}>
        <RestaurantDetail hotelDetail={hotelDetail} />
      </HotelContext.Provider>
      <RoomList roomList={hotelDetail.roomSettingFormList} hotelImage={hotelDetail.imagePath} />
      <ListReview userReviewFormList= {hotelDetail.userReviewFormList} hotelDetail={hotelDetail} />
      <Box className='w-full flex justify-center h-12 fixed bottom-0'>
        <Button
          typeName='primary'
          onClick={() => onClickBookNow(hotelDetail)}
          className='w-32'
        >
          Boow Now
        </Button>
      </Box>
    </Page>
  );
}

export default HotelDetailPage;
