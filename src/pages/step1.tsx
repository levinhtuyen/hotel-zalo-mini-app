import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Page, Button, Swiper, Title, useStore, zmp,SwiperSlide,Text } from "zmp-framework/react";
import getImgUrl from '../utils/img-url';
import api from 'zmp-sdk';
import store from '../store'
import { FaCalendarAlt,FaCheckCircle,FaCircle } from 'react-icons/fa';
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
  let numberPhone: any = ''
  const getNumberPhone = async () =>  {
    await api.getPhoneNumber({
      success: (data) => {
        // xử lý khi gọi api thành công
        numberPhone = data;
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });
  }

  useEffect(() => {
    getNumberPhone();
  }, [])
  useEffect(() =>
  {
    const query = {
      startTime:'16:00',
      endTime: '18:00',
      startDate: '2022-10-05',
      endDate: '2022-10-05',
      mode: 1,
      roomTypeSn: zmproute.query.roomTypeSn,
      bookingType: zmproute.query.bookingType
    };
    if (!dataRoomDetail.length) {
      store.dispatch('getDataRoomDetail', query);
    }
  }, []);
  const onClickToStep = (data) => {
    console.log('data :>> ', data);
  }
  return (
    <Page onPageBeforeIn={hideNavigationBar}
    onPageBeforeOut={hideNavigationBar} className="bg-white">
      <Box className=" h-screen">
        
        <Box m="0" p="4" className="h-32 text-center items-center">
          <div className="text-center flex justify-center align-middle items-center border-none">
            <div className="text-[#ff6400] w-10  border-2 border-[#ff6400] h-10 flex justify-center items-center rounded-full">
              <FaCalendarAlt className="p-1" fontSize={24} />
            </div>
          </div>
          <Text className="pt-2">Xác nhận thông tin</Text>
          <div className="pt-2 steps-booking relative">
              <div className="flex absolute justify-between w-[150px]">
              <FaCheckCircle className="text-[#ff6400] left-5 right-0 top-0" fontSize={12}/>
              {/* <FaCheckCircle className="text-[#ff6400] right-50%" fontSize={12}/>
              <FaCheckCircle className="text-[#ff6400] " fontSize={12}/> */}
              <FaCircle className="text-[#ffb685] right-50%" fontSize={12}/>
              <FaCircle className="text-[#ffb685]" fontSize={12}/>
              </div>
          </div>
        </Box>
        <Box m="0" p="0">
          <div className="mt-2 border-b-2">
            <Section styleLeft='text-[#999]  font-normal' left='Hình thức đặt phòng' right='Theo giờ' />
            <Section styleLeft='text-[#999]  font-normal' left='Khách sạn' right={dataRoomDetail.hotelName} />
            <Section styleLeft='text-[#999]  font-normal' left='Loại phòng' right={dataRoomDetail.name} />
            <hr />
            <Section styleLeft='text-[#999]  font-normal' left='Tên của bạn' right={user.name} />
            <Section styleLeft='text-[#999]  font-normal' left='Số điện thoại' right={numberPhone} />
          </div>
        </Box> 
        <Box className="h-32"></Box>
      </Box>
      <Box px="6" className='w-full flex justify-center h-12 fixed bottom-0'>
        <Button
          typeName='primary'
          onClick={() => onClickToStep(dataRoomDetail)}
          className='w-64'
        >
          Tiếp theo
        </Button>
      </Box>
    </Page>
  );
}

export default Step1;
