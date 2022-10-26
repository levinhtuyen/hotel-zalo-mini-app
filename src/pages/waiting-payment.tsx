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
  const TIMECOUNTDOWN = 3 * 60 * 1000;
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
          <Text className="pt-2 text-[20px] font-semibold">Chờ thanh toán</Text>
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
            <p className="text-[16px] font-normal">Thanh toán đã bị hủy</p>
          )}
          </Box>
        </Box>
        <div className="h-2 bg-slate-100"></div>
        <Box m="0" p="2">
          <Text className="pt-2 font-semibold text-[18px]">Chi tiết phòng</Text>
        </Box>
        <Box m="0" p="0" className="h-full">
          <Section styleLeft='text-[#999]  font-normal' left='Hình thức đặt phòng' right='Theo giờ' />
          <Section styleLeft='text-[#999]  font-normal' left='Khách sạn' right={dataRoomDetail.hotelName} />
          <Section styleLeft='text-[#999]  font-normal' left='Loại phòng' right={dataRoomDetail.name} />
          <div className="h-2 bg-slate-100"></div>
          <Box m="0" p="2">
            <Text className="pt-2 font-semibold text-[18px]">Điểm</Text>
            <Text className="font-medium">Bạn không sử dụng điểm cho đặt phòng này</Text>
          </Box>
          <div className="h-2 bg-slate-100"></div>
          <Box m="0" p="2">
            <Text className="pt-2 font-semibold text-[18px]">Chi tiết thanh toán</Text>
            <Box className="flex justify-between">
              <Text>Trạng thái</Text>
              <Box className="flex items-start">
                <img className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                <Text className="pl-2">Thanh toán bị lỗi</Text>
              </Box>
              
            </Box>
            <hr />
          </Box>
          <Box m="0" p="2">
          <Section styleLeft='text-[#999]  font-normal' left='Tiền phòng' right='269.000 đ' />
          <Section styleLeft='text-[#999]  font-normal' left='Phí sản phẩm' right='0 đ' />
          <Section styleLeft='text-[#999]  font-normal' left='Giờ cao điểm' right='0 đ' />
          <Section styleLeft='text-[#999]  font-normal' left='Ưu đãi' right='- 220.000 đ' />
          </Box>
          <div className="h-2 bg-slate-100"></div>
          <Box m="0" p="2">
            <Text className="pt-2 font-semibold text-[18px]">Chính sách hủy phòng</Text>
            <Text className="font-normal">Không hoàn hủy khi đặt phòng giảm sốc.</Text>
            <Text className="pt-2 font-semibold text-[18px]">Sản phẩm đặc biệt</Text>
            <Text className="font-normal">Đối với phòng Giảm sốc hoặc đặt phòng có dịch vụ đặc biệt : Phải thanh toán trả trước</Text>
            <Text>Tôi đồng ý với <span className="text-[#ff6400]">Chính sách và điều khoản</span> đặt phòng</Text>
          </Box>
        </Box> 
    </Page>
  );
}

export default WaitingPayment;
