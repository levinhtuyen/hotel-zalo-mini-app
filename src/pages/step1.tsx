import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Page, Button, Swiper, Title, useStore, zmp,SwiperSlide,Text } from "zmp-framework/react";
import getImgUrl from '../utils/img-url';
import store from '../store'
import { FaCalendarAlt } from 'react-icons/fa';
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

  const dataRoomDetail = useStore('dataRoomDetail');
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
  console.log('dataRoomDetail :>> ', dataRoomDetail);
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
        </Box>
        <Box m="0" p="0">
          <div className="mt-2 border-b-2">
            <Text className="py-2 font-semibold text-[18px]">Giá phòng gốc</Text>
            <Section left='Giá 1 giờ đầu' right={dataRoomDetail.firstHoursOrigin} />
            <Section left='Giá 1 giờ thêm' right={dataRoomDetail.additionalOrigin} />
            <Section left='Giá qua đêm' right={dataRoomDetail.overnightOrigin} />
            <Section left='Giá 1 ngày' right={dataRoomDetail.oneDayOrigin} />
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
