import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Page, Button, Swiper, Title, useStore, zmp,SwiperSlide,Text } from "zmp-framework/react";
import getImgUrl from '../utils/img-url';
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

function RoomDetail({ zmproute }) {

  const dataRoomDetail = useStore('dataRoomDetail');
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
  const onClickBookNow = () => {
    zmp.views.current?.router.navigate({
      path: '/step1',
      query: query
    })
  }
  return (
    <Page onPageBeforeIn={hideNavigationBar}
    onPageBeforeOut={hideNavigationBar} className="bg-white">
      <Box className=" h-screen">
        <Swiper slidesPerView={1}
          loop={true}
          speed={400}
          autoplay={true}
          spaceBetween={10} scrollbar>

          {dataRoomDetail?.roomTypeImageList?.map((item,index) => (
          <SwiperSlide className="h-[255px] rounded-tl-xl rounded-tr-xl" key={index}>
            <div className='w-full rounded-tl-xl rounded-tr-xl h-[250px]'>
              <img className='h-[250px] object-cover w-full rounded-tl-xl rounded-tr-xl'
                src={getImgUrl(item.imagePath)}/>
              </div>
          </SwiperSlide>
          ))}
        </Swiper>

        <Box m='0' flex justifyContent='space-between' alignItems='center'>
          <Title className="text-[#ff6400]">
            { zmproute.query.bookingType ? 'THEO GI???' : 'THEO NG??Y'}
          </Title>
          <Box flex>
            {dataRoomDetail.additionalHours? <><Box className="border-solid border-2 border-[#e69056] p-1 text-[10px] text-[#ff6400]"> ??u ????i</Box></> : ''}
            {dataRoomDetail.bonusHour? <><Box className="border-solid border-2 border-[#e69056] p-1 text-[10px] text-[#ff6400]"> T???ng gi???</Box></> : ''}
            {dataRoomDetail.flashSale? <><Box className="border-solid border-2 border-[#e69056] p-1 text-[10px] text-[#ff6400]"> Khuy???n m??i</Box></> : ''}
          </Box>
        </Box>
        <Box m="0" p="0">
          <Text className="font-medium text-[18px]">{dataRoomDetail.name}</Text>
          <Text className="font-medium text-[16px]">{dataRoomDetail.firstHours} Gi???</Text>
          <Text className="font-medium text-[16px]">{dataRoomDetail.additionalOrigin} ?? <span className="text-[#c3c1c1] line-through">{dataRoomDetail.firstHoursOrigin} ??</span></Text>
          <Box m="0" p="0" className="h-24 rounded-[6px] border-2 border-[#c3c1c1]">
            <div className="grid grid-cols-2 h-full">
              <Box m="0" p="0" className="border-r-2">
                <Box>
                  <Text>Nh???n ph??ng</Text>
                  <Text className="text-[18px] font-semibold text-[#000]">{dataRoomDetail.endProDate}</Text>
                  <Text className="text-[18px] font-semibold text-[#000]">10:00</Text>
                </Box>
              </Box>
              <Box m="0" p="0" className="float-left text-left">
                <Box>
                  <Text>Tr??? ph??ng</Text>
                  <Text className="text-[18px] font-semibold text-[#000]">{dataRoomDetail.endProDate}</Text>
                  <Text className="text-[18px] font-semibold text-[#000]">11:00</Text>
                </Box>
              </Box>
            </div>
          </Box>
        </Box>
        <Box m="0" p="0">
          <div className="mt-6 border-t-2 border-b-2">
            <Text className="py-2 font-semibold text-[18px]">??i???u ki???n ph??ng</Text>
            {dataRoomDetail?.roomFacilityList?.length ? (
            <Box flex flexWrap>
            {dataRoomDetail?.roomFacilityList?.map((item,index) => (
              <Box className="w-20" key={index}>
                <img className="w-full  px-3" src={getImgUrl(item.imagePath)} alt="" />
                <Text className="w-full text-center">{item.name}</Text>
              </Box>
            ))}
            </Box>
            ) :  (
              <Box mx='4'>Kh??ch s???n n??y kh??ng c?? ti???n ??ch n??o</Box>
            )}
          </div>
        </Box>
        <Box m="0" p="0">
          <div className="mt-2 border-b-2">
            <Text className="py-2 font-semibold text-[18px]">M?? t??? ph??ng</Text>
            {dataRoomDetail?.memo ? (
            <Box flex>
              <div dangerouslySetInnerHTML={{__html: dataRoomDetail.memo}}></div>
            </Box>
            ) :  (
              <Box mx='4'>??ang c???p nh???t</Box>
            )}
          </div>
        </Box>
        <Box m="0" p="0">
          <div className="mt-2 border-b-2">
            <Text className="py-2 font-semibold text-[18px]">Gi?? ph??ng g???c</Text>
            <Section left='Gi?? 1 gi??? ?????u' right={dataRoomDetail.firstHoursOrigin} />
            <Section left='Gi?? 1 gi??? th??m' right={dataRoomDetail.additionalOrigin} />
            <Section left='Gi?? qua ????m' right={dataRoomDetail.overnightOrigin} />
            <Section left='Gi?? 1 ng??y' right={dataRoomDetail.oneDayOrigin} />
          </div>
        </Box> 
        <Box className="h-32"></Box>
      </Box>
      <Box px="6" className='w-full flex justify-center h-12 fixed bottom-0'>
        <Button
          typeName='primary'
          onClick={() => onClickBookNow()}
          className='w-64'
        >
          ?????t ph??ng ngay
        </Button>
      </Box>
    </Page>
  );
}

export default RoomDetail;
