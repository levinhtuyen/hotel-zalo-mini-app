import { useEffect, useState } from 'react';
import { Box, Button, Page, useStore } from "zmp-framework/react";
import BookingItem from "../components/book/booking";
import store from '../store'


function CalendarPage() {

  const bookings = useStore('bookings');
  useEffect(() =>
  {
    if (!bookings.length) {
      store.dispatch('getBookingsList');
    }
  }, []);
    return (
      <Page>
        {!bookings?.length? (
          <Box className='text-center' mt='10'>
            Bạn chưa có booking nào
          </Box>
        ) : (
          <>
            {bookings.map((booking,index) => (
              <Box key={index} my='4'>
                <BookingItem booking={booking} />
              </Box>
            ))}
          </>
        )}
      </Page>
    );
}

export default CalendarPage;
