import { FunctionComponent, useEffect, useState, } from 'react';
import {
  Box,
  Button,
  Card,
  Text,
  Title,
  zmp,
  useStore,
} from 'zmp-framework/react';
import { useBookingTotal } from "../../hooks";
import { Booking } from "../../models";
import store from "../../store";
import Distance from './../distance';
import Price from "../format/price";
import Time from "../format/time";
import BookingDetailItem from "./booking-detail-item";
import Swipeable from "../swipeable";
import getImgUrl from "../../utils/img-url"

interface BookingItemProps {
  booking: any
}

const BookingItem: FunctionComponent<BookingItemProps> = ({ booking }) => {
  const [selectingState, setSelectingState] = useState(false);
  console.log('booking 222 :>> ', booking);
  return (
    <Box flex alignItems='center'>
      <div className='bg-white p-2 max-w-2xl sm:w-full sm:p-4 h-auto sm:h-14 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none'>
        <div className=' sm:h-full sm:w-24 rounded-xl bg-gray-100 bg-center bg-cover'>
          <img
            className='rounded-xl'
            src={getImgUrl(booking.imagePath)}
            alt=''
          />
        </div>
        <div className='flex sm:flex-1 flex-col gap-2 p-1'>
          <h1 className='text-lg sm:text-xl font-semibold text-primary'>
            {booking.hotelName}
          </h1>
          <Title>{booking.roomTypeName}</Title>
          <p className='text-gray-500 text-sm sm:text-base line-clamp-3'>
            {booking.hotelAddress}
          </p>
          <div className='flex gap-4 mt-auto'>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectingState(false);
                zmp.views.main.router.navigate({
                  path: '/booking-detail/',
                  query: {
                    id: booking.id,
                  },
                });
              }}
              className='ml-auto flex-end items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500'
            >
              <span>Xem thêm</span>
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default BookingItem;
