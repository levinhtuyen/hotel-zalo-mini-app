
import { Page, useStore, Title, Box, Text, zmp } from 'zmp-framework/react';
import { userInfo } from 'zmp-sdk';
import HotelItem from '../components/hotel-item'
import setHeader from '../services/header';
import { changeStatusBarColor } from '../services/navigation-bar';
import {
  showNavigationBar
} from '../components/navigation-bar';

const HotelList = () => {
  const hotelList = useStore('hotelList');
  return (
    <>
      <div>
        <Page
          name='hotel-list'
          key='hotel-list'
          onPageBeforeIn={() => {
            zmp.toolbar.show('#view-hotel-list', true);
            showNavigationBar;
            setHeader({ title: 'Hotel List', type: 'primary' });
            changeStatusBarColor('secondary');
          }}
        >
          <Box mx='4' mt='5'>
            <Title size='small'>Danh sách khách sạn</Title>
            {hotelList.map((hotel) => (
              <Box key={hotel.sn} mx='0' my='3'>
                <HotelItem
                  layout='list-item'
                  hotel={hotel}
                  after={
                    <Text size='small' className='text-gray-500'>
                      {hotel.address}
                    </Text>
                  }
                />
              </Box>
            ))}
          </Box>
        </Page>
      </div>
    </>
  );
};

export default HotelList;
