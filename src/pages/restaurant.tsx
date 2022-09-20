import { Box, Page, useStore, zmp, ToastPreloader } from 'zmp-framework/react';
import { useRestaurant } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import HotelContext from './restaurant/context';
import RestaurantDetail from "./restaurant/detail";
import React, { useEffect, useState } from 'react';
import store from '../store';
function RestaurantPage({ zmproute }) {
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
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      <HotelContext.Provider value={{ hotelDetail }}>
        <RestaurantDetail hotel={hotelDetail} />
      </HotelContext.Provider>
      <Box height={200}></Box>
    </Page>
  );
}

export default RestaurantPage;
