import React, { useEffect } from 'react';
import { Box, Page, useStore, zmp } from 'zmp-framework/react';
import store from '../store';
import BookingDetail from "../components/booking-detail/detail";
import setHeader from '../services/header';
import { changeStatusBarColor } from '../services/navigation-bar';
import {
  showNavigationBar,
  hideNavigationBar,
} from '../components/navigation-bar';

function BookingDetailPage({ zmproute })
{
  const loading = useStore('loadingBookingDetail');
  const bookingDetail: any = useStore('bookingDetail');
  useEffect(() => {
    if (!bookingDetail?.length) {
      // store.dispatch('getBookingDetail', zmproute.query);
    }
  }, []);

  if (loading)
  {
    return <BookingDetail loading bookingDetail={undefined} />;
  }
  return (
    <>
      <React.Fragment key={bookingDetail.sn}>
        <Page
          name='booking-detail'
          key='booking-detail'
          onPageBeforeIn={() => {
            zmp.toolbar.show('#view-booking-detail', true);
            setHeader({ title: 'Booking detail', type: 'primary' });
            changeStatusBarColor('secondary');
          }}
        >
          <Box mx='4' mt='5'>
            <BookingDetail loading={false} bookingDetail={bookingDetail} />
          </Box>
        </Page>
      </React.Fragment>
    </>
  );

}
export default BookingDetailPage;
