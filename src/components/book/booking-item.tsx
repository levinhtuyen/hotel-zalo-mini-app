
import React, { FunctionComponent } from 'react';
import {
  Box,
  Button,
  Card,
  Text,
  Title,
  zmp,
  SkeletonBlock,
  SkeletonText,
  SkeletonImage,
  useStore,
} from 'zmp-framework/react';

import getImgUrl from '../../utils/img-url';

interface BookingItemProps {
  booking: any,
  loading:boolean
}

const BookingItem: FunctionComponent<BookingItemProps> = ({
  loading,booking,
}) =>
{


  const toBookingDetail = () => {
    zmp.views.main.router.navigate({
      path: '/booking-detail',
      query: {
        userBookingSn: booking.sn,
      },
    });
  };
  if (loading) {
    return (
      <Box mx='0' my='3' className='post'>
        <Card inset className='overflow-hidden shadow-3	p-0'>
          <Box m='0' height={100} flex flexDirection='row' alignItems='stretch'>
            <div className='post-thumbnail overflow-hidden'>
              <SkeletonBlock
                tag='div'
                borderRadius='5'
                width='92'
                height='320'
                effect='fade'
              />
            </div>
            <Box>
              <SkeletonImage
                tag='div'
                color=''
                borderRadius='18'
                showIcon
                iconColor='gray'
                width={100}
                height={100}
                effect='wave'
              />
            </Box>
            <Box
              m='0'
              py='5'
              mx='5'
              flex
              flexDirection='column'
              className='flex-1'
            >
              <SkeletonText tag='span' effect='fade'>
                Lorem ipsum
              </SkeletonText>
              <SkeletonText tag='span' effect='fade'>
                Lorem ipsum dolor sit amet consectetur
              </SkeletonText>
            </Box>
          </Box>
          <Box>
            <SkeletonText tag='span' effect='fade'>
              Lorem ipsum dolor sit amet consectetur consectetur
            </SkeletonText>
            <SkeletonText tag='span' effect='fade'>
              Lorem ipsum dolor sit amet consectetur consectetur consectetur 123 234
            </SkeletonText>
          </Box>
        </Card>
      </Box>
    );
  }
  return (
    <div className='bg-white p-2 max-w-3xl sm:w-full sm:p-4 h-auto sm:h-32 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none'>
      <div className=' sm:h-full sm:w-32 rounded-xl bg-gray-100 bg-center bg-cover'>
        <img className='rounded-xl' src={getImgUrl(booking.imagePath)} alt='' />
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
            onClick={toBookingDetail}
            className='ml-auto flex-end items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500'
          >
            <span>Xem thêm</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
