import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import Notch from "../components/notch";
import Price from "../components/format/price";
import { Booking } from "../models";
import { useBookingTotal } from "../hooks";
import Time from "../components/format/time";
import CartItem from "../components/cart/cart-item";
import store from '../store'

function Section({
  left,
  right,
  styleLeft,
  sizeLeft,
  sizeRight,
  styleRight,
}: {
  left: ReactNode;
  right: ReactNode;
  sizeLeft?: any;
  sizeRight?: any;
  styleLeft?: any;
  styleRight?: any;
}) {
  return (
    <>
      <Box m='0' flex justifyContent='space-between' alignItems='center'>
        <Title
          className={styleLeft + ' mx-6 my-4'}
          size={sizeLeft ? sizeLeft : 'small'}
        >
          {left}
        </Title>
        <Title
          size={sizeRight ? sizeRight : 'small'}
          className={styleRight + ' mx-6 my-4'}
        >
          {right}
        </Title>
      </Box>
      <hr />
    </>
  );
}

function RoomDetail({ zmprouter }) {
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
  const cancelBooking = () =>
  {
    zmprouter.back();
  }
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
                  right={<>{bookingDetail.roomTypeName}</>}
                />
                <Section left='Booking No' right={bookingDetail.bookingNo} />
                <Section left='Tổng tiền' right={bookingDetail.hotelFee} />
                <Section
                  left='Khuyến mãi'
                  right={'-' + bookingDetail.totalDiscount}
                />
                <Section
                  sizeLeft={'nomal'}
                  styleLeft={'font'}
                  sizeRight={'larg'}
                  left='Số tiền thanh toán'
                  right={bookingDetail.amountFromUser}
                />
              </>
            )}
          </div>
          <hr />
          <Box m='6'>
            <Button
              onClick={() => cancelBooking()}
              large
              typeName='secondary'
              responsive
              className='rounded-xl'
            >
              Huỷ đặt phòng
            </Button>
          </Box>
        </>
      )}
    </Sheet>
  );
}

export default RoomDetail;
