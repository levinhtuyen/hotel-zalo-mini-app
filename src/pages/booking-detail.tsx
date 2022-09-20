import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import Notch from "../components/notch";
import Price from "../components/format/price";
import { Booking } from "../models";
import { useBookingTotal } from "../hooks";
import Time from "../components/format/time";
import CartItem from "../components/cart/cart-item";
import store from '../store'

function Section({ left, right }: { left: ReactNode, right: ReactNode }) {
  return <>
    <Box m="0" flex justifyContent="space-between" alignItems="center">
      <Title size="small" className="mx-6 my-4">{left}</Title>
      <Title size="small" className="mx-6 my-4">{right}</Title>
    </Box>
    <hr />
  </>;
}

function BookingDetail({ zmproute, zmprouter }) {
  // const bookings = useStore('bookings') as Booking[];
  // const booking = useMemo(() => bookings.find(b => b.id === zmproute.query.id), [zmproute])
  const bookingDetail = useStore('bookingDetail');
  useEffect(() =>
  {
    const query = {
      userBookingSn: 271639,
    };
    if (!bookingDetail.length) {
      store.dispatch('getBookingDetail', query);
    }
  }, []);

  return (
    <Sheet
      backdrop
      swipeToClose
      className='h-auto'
      swipeHandler='.swiper-handler'
    >
      <Notch color='black' />
      {bookingDetail && (
        <>
          <Box
            className='swiper-handler'
            p='4'
            mt='6'
            flex
            justifyContent='center'
          >
            <Title size='small'>{bookingDetail.hotelName}</Title>
          </Box>
          <hr />
          <div className='swiper-handler'>
            {bookingDetail && (
              <>
                <Section
                  left='Room name'
                  right={<>{bookingDetail.totalDiscount}</>}
                />
                <Section left='Booking NO' right={bookingDetail.bookingNo} />
                <Section left='Địa chỉ' right={bookingDetail.hotelAddress} />
              </>
            )}
            <Section left='Chi tiết' right={bookingDetail.hotelFee} />
          </div>
          {bookingDetail.totalDiscount ? (
            <Box
              m='0'
              p='2'
              className='overflow-y-auto'
              style={{
                maxHeight: `calc(50vh - ${
                  bookingDetail.totalDiscount ? 54 * 4 : 0
                }px)`,
                minHeight: 120,
              }}
            ></Box>
          ) : (
            <Box my='4' flex justifyContent='center'>
              Không có dữ liệu
            </Box>
          )}
          <hr />
          <Box m='6'>
            <Button
              onClick={() => zmprouter.back()}
              large
              typeName='secondary'
              responsive
              className='rounded-xl'
            >
              Huỷ
            </Button>
          </Box>
        </>
      )}
    </Sheet>
  );
}

export default BookingDetail;
