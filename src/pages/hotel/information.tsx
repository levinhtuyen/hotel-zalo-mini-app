import { Box, Button, Icon, Text, Title,Preloader } from "zmp-framework/react";
import api from 'zmp-sdk';
import { useContext, useState } from 'react';
import HotelContext from './context';

function Information()
{
  const { hotelDetail } = useContext(HotelContext);
  const logo = 'https://go2joy.vn/images/logo-mini.png';
  const [toastLoading, setToastLoading] = useState(true);
  setTimeout(() =>
  {
    setToastLoading(false);
  }, 500);
  return (
    <>
      {toastLoading ? (
        <Box mx='4' mt='5'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Preloader logo={logo} />
          </div>
        </Box>
      ) : (
        <>
          <Box mx='2'>
            <Box mx='2' mt='5'>
              <Title size='small'>Thông tin</Title>
              {/* <Text>
                {hotelDetail?.description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hotelDetail?.description,
                    }}
                  ></div>
                ) : (
                  ''
                )}
              </Text> */}
            </Box>
            <Box mx='2' mt='6'>
              <Title size='small'>Giờ mở cửa</Title>
              <Box
                flex
                mx='0'
                alignItems='center'
                justifyContent='space-between'
              >
                <span>
                  <Icon zmp='zi-clock-1' className='text-green-500 mr-1' />
                </span>
                <span>
                  <Icon zmp='zi-calendar' className='text-secondary mr-1' />
                </span>
              </Box>
            </Box>
            <Box mx='2' mt='6'>
              <Title size='small'>Hotline liên hệ</Title>
              <Box
                flex
                mx='0'
                alignItems='center'
                justifyContent='space-between'
              >
                <Button
                  style={{ padding: 0 }}
                  onClick={() =>
                    api.openPhone({
                      phoneNumber: (hotelDetail.hotline = '0123456789'),
                    })
                  }
                >
                  <Icon zmp='zi-call' className='text-green-500 mr-1' />
                  0123456789
                </Button>
              </Box>
            </Box>
            <Box mx='2' mt='6'>
              <Title size='small'>Địa chỉ</Title>
              <Box
                flex
                mx='0'
                alignItems='center'
                justifyContent='space-between'
                mb='5'
              >
                <span>
                  <Icon zmp='zi-location-solid' className='text-red-500 mr-1' />
                  {hotelDetail.address}
                </span>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Information;
