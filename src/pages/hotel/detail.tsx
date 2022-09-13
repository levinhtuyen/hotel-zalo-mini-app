import { ReactNode, useContext, useEffect } from 'react';
import { Box, Button, Text, Title, useStore, zmp } from 'zmp-framework/react';
import Distance from "../../components/distance";
import DistrictName from "../../components/district-name";
import { TabType } from '../../models';
import store from "../../store";
import HotelContext from "./context";
import Information from './information';
import TabRoom from './room';
import Review from './review';
import getImgUrl from '../../utils/img-url';

function HotelDetailComponent(props) {
  const { hotelDetail } = useContext(HotelContext);
  const currentTab = useStore('hotelTab') as TabType;
  const setCurrentTab = (tab) => {
    store.dispatch('changeHotelTab', tab);
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
          {hotelDetail.hotelImage}
          <img
            src={getImgUrl(hotelDetail.imagePath)}
            className='absolute w-full h-full object-cover rounded-xl'
          />
        </div>
        <Box
          mx='4'
          className='bg-white rounded-2xl text-center relative restaurant-detail-box'
          p='4'
          style={{ marginTop: -60 }}
        >
          <Title bold>{hotelDetail.name}</Title>
          <Text className='text-gray-500'>{hotelDetail?.address}</Text>
          <Box flex justifyContent='center' mt='0' py='3'>
            <Button className='text-red-500' iconZMP='zi-location-solid'>
              <span className='text-gray-500'>
                <DistrictName id={hotelDetail.sn} />
              </span>
            </Button>
            <Button iconZMP='zi-send-solid'>
              <span className='text-gray-500'>
                <Distance
                  location={{
                    lat: hotelDetail.latitude,
                    long: hotelDetail.longitude,
                  }}
                />
              </span>
            </Button>
          </Box>
          <Box flex justifyContent='center' mb='0'>
            <TabItem tab='info'>Thông tin</TabItem>
            <TabItem tab='room'>DS phòng</TabItem>
            <TabItem tab='review'>Đánh giá</TabItem>
          </Box>
        </Box>
      </Box>
      {
        {
          info: <Information />,
          room: <TabRoom params={props.params} />,
          review: <Review />,
        }[currentTab]
      }
    </>
  );
}

export default HotelDetailComponent;
