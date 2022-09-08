import { Box, Page, Button, useStore } from 'zmp-framework/react';
import {  useEffect } from 'react';
import { useHotel } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import HotelContext from "./hotel/context";
import HotelListDetail from "./hotel/detail";
import store from '../store';

function HotelPage({ zmproute })
{
  const query = {
    bookingType: zmproute.query.bookingType,
    hotelSn: zmproute.query.hotelSn,
  };
  const hotelDetail: any = useStore('hotelDetail');
  useEffect(() => {
    if (!hotelDetail?.length) {
      store.dispatch('getHotelDetail', query);
      // hotelDetail = useStore('hotelDetail');
    }
  }, []);
  console.log('hotelDetail :>> ', hotelDetail);
  const onBookNow = () =>
  {
    
  };
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      {hotelDetail ? (
        <HotelContext.Provider value={{ hotelDetail }}>
          <HotelListDetail />
        </HotelContext.Provider>
      ) : (
        <Box mx='4'>Không có dữ liệu</Box>
      )}
      <Box height={200}></Box>
      <Box className='fixed bottom-0 left-0 right-0 z-10'>
        <Button
          fill
          responsive
          large
          className='rounded-xl'
          onClick={onBookNow}
        >
          Book Now
        </Button>
      </Box>
    </Page>
  );
}

export default HotelPage;
