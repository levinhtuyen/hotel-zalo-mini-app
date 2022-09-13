import { Box, Button, Icon, Text, Title,Preloader } from "zmp-framework/react";
import api from 'zmp-sdk';
import { useContext, useState } from 'react';
import HotelContext from './context';

function Information()
{
  const { hotelDetail } = useContext(HotelContext);
  const logo = './src/static/icons/logo-app.png';
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
              <Text>
                {hotelDetail?.description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hotelDetail?.description,
                    }}
                  ></div>
                ) : (
                  ''
                )}
              </Text>
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
              <iframe
                className='w-full aspect-cinema rounded-xl'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868527438!2d106.70554879999999!3d10.781038700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f492daac79b%3A0x16e334e4778de0c1!2zMTVhIEzDqiBUaMOhbmggVMO0biwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1655781904560!5m2!1svi!2s'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Information;
