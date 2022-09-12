import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Page,
  Sheet,
  Text,
  Title,
  useStore,
  zmp,
} from 'zmp-framework/react';
import store from '../store';
import BookingDetail from "../components/booking-detail/detail";

function BookingDetailPage({ zmproute })
{
  const loading = useStore('loadingBookingDetail');
  const bookingDetail: any = useStore('bookingDetail');
  useEffect(() => {
    if (!bookingDetail?.length) {
      store.dispatch('getBookingDetail', zmproute.query);
    }
  }, []);

  
  if (loading)
  {
    return <BookingDetail loading bookingDetail={undefined} />;
  }
  return (
    <Page name='booking-detail'>
      <>
        <Box mx='4' mt='5'>
          <BookingDetail loading={false} bookingDetail={bookingDetail} />
        </Box>
      </>
    </Page>
  );

}

export default BookingDetailPage;
