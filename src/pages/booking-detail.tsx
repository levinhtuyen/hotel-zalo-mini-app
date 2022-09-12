import { useState, useRef, useEffect } from 'react';
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import store from '../store';
import BookingDetailItem from "../components/booking-detail/booking-item";

function BookingDetail({ zmproute }) {
  const bookingDetail: any = useStore('bookingDetail');
  useEffect(() => {
    if (!bookingDetail?.length) {
      store.dispatch('getBookingDetail', zmproute.query);
    }
  }, []);
  console.log('bookingDetail :>> ', bookingDetail);

  return (
    <h1>booking detail</h1>
  )

}

export default BookingDetail;
