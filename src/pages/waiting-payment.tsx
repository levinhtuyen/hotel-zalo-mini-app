import { ReactNode, useEffect, useRef, useState } from "react";
import { Box, Page, Button, Swiper, Title, useStore, zmp,SwiperSlide,Text } from "zmp-framework/react";
import { useCountdown } from '../utils/countdown';
import store from '../store'
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

function WaitingPayment({ zmproute }) {
  const dataUser = useStore('user')
  const dataRoomDetail = useStore('dataRoomDetail');
  const user = useStore('user');

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

  const [selectingState, setSelectingState] = useState(false);
  const choosePayment = () => {
    console.log('123');
  }
  const TIMECOUNTDOWN = 10 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + TIMECOUNTDOWN;
  const [days, hours, minutes, seconds] = useCountdown(dateTimeAfterThreeDays);
  return (
    <Page onPageBeforeIn={hideNavigationBar}
    onPageBeforeOut={hideNavigationBar} className="bg-white  overflow-scroll">
      <Box m="0" pt="4" className="h-64 text-center items-center bg-white  ">
          <div className="text-center flex justify-center align-middle items-center border-none">
            <img src="https://go2joy.vn/images/direct-app-notice-img.png" alt="" />
          </div>
          <Text className="pt-2 text-[20px] font-semibold">Ch??? thanh to??n</Text>
          <Box className="pt-2 text-[18px] font-semibold"> {days || hours || minutes || seconds ? (
            <p>
              <span>{days}</span>
              <span>:</span>
              <span>{hours}</span>
              <span>:</span>
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </p>
          ) : (
            <p className="text-[16px] font-normal">Thanh to??n ???? b??? h???y</p>
          )}
          </Box>
        </Box>
        <div className="h-2 bg-slate-100"></div>
        <Box m="0" p="2">
          <Text className="pt-2 font-semibold text-[18px]">Chi ti???t ph??ng</Text>
        </Box>
        <Box m="0" p="0" className="h-full">
          <Section styleLeft='text-[#999]  font-normal' left='H??nh th???c ?????t ph??ng' right='Theo gi???' />
          <Section styleLeft='text-[#999]  font-normal' left='Kh??ch s???n' right={dataRoomDetail.hotelName} />
          <Section styleLeft='text-[#999]  font-normal' left='Lo???i ph??ng' right={dataRoomDetail.name} />
          <div className="h-2 bg-slate-100"></div>
          <Box m="0" p="2">
            <Text className="pt-2 font-semibold text-[18px]">??i???m</Text>
            <Text className="font-medium">B???n kh??ng s??? d???ng ??i???m cho ?????t ph??ng n??y</Text>
          </Box>
          <div className="h-2 bg-slate-100"></div>
          <Box m="0" p="2">
            <Text className="pt-2 font-semibold text-[18px]">Chi ti???t thanh to??n</Text>
            <Box className="flex justify-between">
              <Text>Tr???ng th??i</Text>
              <Box className="flex items-start">
                <img className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                <Text className="pl-2">Thanh to??n b??? l???i</Text>
              </Box>
              
            </Box>
            <hr />
          </Box>
          <Box m="0" p="2">
          <Section styleLeft='text-[#999]  font-normal' left='Ti???n ph??ng' right='269.000 ??' />
          <Section styleLeft='text-[#999]  font-normal' left='Ph?? s???n ph???m' right='0 ??' />
          <Section styleLeft='text-[#999]  font-normal' left='Gi??? cao ??i???m' right='0 ??' />
          <Section styleLeft='text-[#999]  font-normal' left='??u ????i' right='- 220.000 ??' />
          </Box>
          <div className="h-2 bg-slate-100"></div>
          <Box m="0" p="2">
            <Text className="pt-2 font-semibold text-[18px]">Ch??nh s??ch h???y ph??ng</Text>
            <Text className="font-normal">Kh??ng ho??n h???y khi ?????t ph??ng gi???m s???c.</Text>
            <Text className="pt-2 font-semibold text-[18px]">S???n ph???m ?????c bi???t</Text>
            <Text className="font-normal">?????i v???i ph??ng Gi???m s???c ho???c ?????t ph??ng c?? d???ch v??? ?????c bi???t : Ph???i thanh to??n tr??? tr?????c</Text>
            <Text>T??i ?????ng ?? v???i <span className="text-[#ff6400]">Ch??nh s??ch v?? ??i???u kho???n</span> ?????t ph??ng</Text>
          </Box>
        </Box> 
    </Page>
  );
}

export default WaitingPayment;
