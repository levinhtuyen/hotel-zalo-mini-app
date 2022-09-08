import { ReactNode, useContext, useEffect } from 'react';
import { Box, Button, Text, Title, useStore, zmp } from 'zmp-framework/react';
import Distance from "../../components/distance";
import DistrictName from "../../components/district-name";
import { TabType } from '../../models';
import store from "../../store";
import HotelContext from "./context";
import Information from './information';
import Menu from "./menu";
import Booking from './booking';
import getImgUrl from '../../utils/img-url';

function HotelDetail() {
  const { hotel } = useContext(HotelContext);
  
  const currentTab = useStore('restaurantTab') as TabType;
  const setCurrentTab = (tab) => {
    store.dispatch('changeRestaurantTab', tab);
  };

  const TabItem = ({
    tab,
    children,
  }: {
    tab: TabType;
    children: ReactNode;
  }) => (
    <Button
      fill
      typeName={currentTab === tab ? 'primary' : 'tertiary'}
      onClick={() => setCurrentTab(tab)}
      className='mx-1 flex-none'
    >
      {children}
    </Button>
  );

  return (
    <>
      <Box m='5'>
        <div className='relative aspect-video w-full'>
          <img
            src={getImgUrl(hotel.hotelImage)}
            className='absolute w-full h-full object-cover rounded-xl'
          />
        </div>
        <Box
          mx='4'
          className='bg-white rounded-2xl text-center relative restaurant-detail-box'
          p='4'
          style={{ marginTop: -60 }}
        >
          <Title bold>{hotel.name}</Title>
          <Text className='text-gray-500'>{hotel.provinceName}</Text>
          <Box flex justifyContent='center' mt='0' py='3'>
            <Button className='text-red-500' iconZMP='zi-location-solid'>
              <span className='text-gray-500'>
                <DistrictName id={hotel.sn} />
              </span>
            </Button>
            <Button iconZMP='zi-send-solid'>
              <span className='text-gray-500'>
                <Distance
                  location={{ lat: hotel.latitude, long: hotel.longitude }}
                />
              </span>
            </Button>
          </Box>
          <Box flex justifyContent='center' mb='0'>
            <TabItem tab='info'>Thông tin</TabItem>
            <TabItem tab='menu'>DS phòng</TabItem>
            <TabItem tab='book'>Đánh giá</TabItem>
          </Box>
        </Box>
      </Box>
      {{ info: <Information />, menu: <Menu />, book: <Booking /> }[currentTab]}
    </>
  );
}

export default HotelDetail;
