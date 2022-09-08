import { FunctionComponent } from "react";
import { Box, Button, Icon, Text, Title, zmp } from "zmp-framework/react";
import { Hotel, HotelDetail } from "../models";
import Distance from "./distance";
import DistrictName from "./district-name";
import getImgUrl from '../utils/img-url';

interface HotelProps {
  layout: 'cover' | 'list-item';
  hotel: HotelDetail;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const HotelItem: FunctionComponent<HotelProps> = ({ layout, hotel, before, after, onClick }) => {
  const viewDetail = () => {
    zmp.views.main.router.navigate({
      path: '/hotel',
      query: {
        id: hotel.sn
      }
    })
  }
  console.log('hotel.hotelImage :>> ', hotel.hotelImage);
  if (layout === 'cover') {
    return (
      <div
        onClick={onClick ?? viewDetail}
        className='relative bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover'
      >
        <div className='aspect-cinema relative'>
          <img
            src={getImgUrl(hotel.hotelImage)}
            className='absolute w-full h-full object-cover'
          />
        </div>
        <div className='absolute left-3 top-3 py-1 px-3 flex items-center font-semibold text-sm text-white bg-primary rounded-full'>
          <Icon zmp='zi-star-solid' />
          {hotel.averageMark}
        </div>
        <Title size='small' className='mt-2 mb-0 mx-4'>
          {hotel.name}
        </Title>
        <Box flex mt='0'>
          <Button className='text-red-500' iconZMP='zi-location-solid' small>
            <span className='text-gray-500'>
              <DistrictName id={1} />
            </span>
          </Button>
          <Button iconZMP='zi-send-solid' small>
            <span className='text-gray-500'>
              <Distance
                location={{ lat: hotel.latitude, long: hotel.longitude }}
              />
            </span>
          </Button>
        </Box>
      </div>
    );
  }
  return (
    <div
      onClick={onClick ?? viewDetail}
      className='bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover'
    >
      <Box m='0' flex>
        <div className='flex-none aspect-card relative w-32'>
          <img
            src={getImgUrl(hotel.hotelImage)}
            className='absolute w-full h-full object-cover rounded-xl'
          />
        </div>
        <Box my='4' mx='5'>
          {before}
          <Title size='small'>{hotel.name}</Title>
          {after}
          <Box mx='0' mb='0' flex>
            <Button
              iconZMP='zi-star-solid'
              small
              className='text-yellow-400 pl-0'
            >
              <span className='text-gray-500'>{hotel.averageMark}</span>
            </Button>
            <Button iconZMP='zi-send-solid' small>
              <span className='text-gray-500'>
                <Distance
                  location={{ lat: hotel.latitude, long: hotel.longitude }}
                />
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default HotelItem;
