
import {
  Page,
  useStore,
  Title,
  Box,
  Text,
  zmp,
} from 'zmp-framework/react';
import { userInfo } from 'zmp-sdk';
import { Hotel } from '../models';
import HotelItem from '../components/hotel';
const HotelList = () => {
  const hotelList = useStore('nearests') as Hotel[];
  const user: userInfo = useStore('user')
    return (
      <Page name='home'>
        <>
          <Box mx='4' mt='5'>
            <Title size='small'>Danh sách khách sạn</Title>
            {hotelList.map((hotel) => (
              <Box key={hotel.id} mx='0' my='3'>
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
        </>
      </Page>
    );
}

export default HotelList;
