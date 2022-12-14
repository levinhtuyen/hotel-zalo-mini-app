import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Page, Button, Swiper, Title, useStore, zmp,SwiperSlide,Text } from "zmp-framework/react";
import getImgUrl from '../utils/img-url';
import api from 'zmp-sdk';
import store from '../store'
import { FaCcAmazonPay,FaCheckCircle,FaCircle } from 'react-icons/fa';
import {
  hideNavigationBar,
  showNavigationBar,
} from '../components/navigation-bar';

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
          className={styleLeft + ' mx-2 my-2'}
          size={sizeLeft ? sizeLeft : 'small'}
        >
          {left}
        </Title>
        <Title
          size={sizeRight ? sizeRight : 'small'}
          className={styleRight + ' mx-2 my-2'}
        >
          {right}
        </Title>
      </Box>
    </>
  );
}

function Step1({ zmproute }) {
  const dataUser = useStore('user')
  const dataRoomDetail = useStore('dataRoomDetail');
  const user = useStore('user');
  const query = {
    startTime:'16:00',
    endTime: '18:00',
    startDate: '2022-10-05',
    endDate: '2022-10-05',
    mode: 1,
    roomTypeSn: zmproute.query.roomTypeSn,
    bookingType: zmproute.query.bookingType
  };
  useEffect(() =>
  {
    
    if (!dataRoomDetail.length) {
      store.dispatch('getDataRoomDetail', query);
    }
  }, []);
  const onClickToStep = () => {

    zmp.views.current.router.navigate({
      path: '/waiting-payment',
      query: query
    })
  }
  const [selectingState, setSelectingState] = useState(false);

  return (
    <Page onPageBeforeIn={hideNavigationBar}
    onPageBeforeOut={hideNavigationBar} className="bg-white">
      <Box m="0" pt="0" className=" h-screen">
        
        <Box m="0" pt="4" className="h-32 text-center items-center sticky top-0 bg-white z-10 shadow-lg">
          <div className="text-center flex justify-center align-middle items-center border-none">
            <div className="text-[#ff6400] w-10  border-2 border-[#ff6400] h-10 flex justify-center items-center rounded-full">
              <FaCcAmazonPay className="p-1" fontSize={24} />
            </div>
          </div>
          <Text className="pt-2">X??c nh???n th??ng tin</Text>
          <div className="pt-2 steps-booking relative">
              <div className="flex absolute justify-between w-[150px] steps-booking-line">
              <FaCheckCircle className="text-[#ff6400] left-5 right-0 top-0 z-10" fontSize={18}/>
              {/* <FaCheckCircle className="text-[#ff6400] right-50%" fontSize={18}/>
              <FaCheckCircle className="text-[#ff6400] " fontSize={18}/> */}
              <FaCheckCircle className="text-[#ff6400] left-5 right-0 top-0 z-10" fontSize={18}/>
              <FaCircle className="text-[#ffb685]" fontSize={18}/>
              </div>
          </div>
        </Box>
        <Box m="0" p="2">
          <div className="mt-2 border-b-2">
          <Text className="py-2 font-semibold text-[18px]">Thanh to??n</Text>
          </div>
        </Box>
        <Box m="0" p="0">
          <div className="mt-2 border-b-2">
            <Section styleLeft='text-[#999]  font-normal' left='H??nh th???c ?????t ph??ng' right='Theo gi???' />
            <Section styleLeft='text-[#999]  font-normal' left='Kh??ch s???n' right={dataRoomDetail.hotelName} />
            <Section styleLeft='text-[#999]  font-normal' left='Lo???i ph??ng' right={dataRoomDetail.name} />
            <hr />
            
          </div>
        </Box> 
        <Box className="h-32">
          <Text className="py-2 font-semibold text-[18px]">Ph????ng th???c thanh to??n</Text>
          <Box className="float-right">
              <Button onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectingState(false);
              zmp.views.main.router.navigate({
                path: '/choose-payment-method/',
              });
              
          }} typeName='primary'>Ch???n ph????ng th???c</Button>
          </Box>
        </Box>
      </Box>
      <Box px="6" className='w-full flex justify-center h-12 fixed bottom-0'>
        <Button
          typeName='primary'
          onClick={()=> onClickToStep()}
          className='w-64'
        >
          Thanh to??n
        </Button>
      </Box>
    </Page>
  );
}

export default Step1;
