import {
  Box,
  Page,
  Button,
  useStore,
  zmp,
  ToastPreloader,
} from 'zmp-framework/react';
import { useEffect, useState } from 'react';
import { useHotel } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import HotelContext from "./hotel/context";
import HotelDetailComponent from "./hotel/detail";
import store from '../store';

function HotelPage({ zmproute })
{
  const query = {
    bookingType: zmproute.query.bookingType,
    hotelSn: zmproute.query.hotelSn,
  };
    const [toastLoading, setToastLoading] = useState(true);
  const hotelDetail: any = useStore('hotelDetail');
  const loading = useStore('loadingHotelDetail');
  useEffect(() =>
  {
    openToastLoading()
    if (!hotelDetail?.length) {
      store.dispatch('getHotelDetail', query);
    }
  }, []);
  const onBookNow = () =>
  {
    zmp.views.main.router.navigate({
      path: '/booking-list',
    });
  };
  const openToastLoading = () => {
    setToastLoading(true);
    setTimeout(() => {
      setToastLoading(false);
    }, 500);
  };
  if (loading)
  {
    return (
      <>
        <ToastPreloader visible={toastLoading} text='Đang tải' />
      </>
    );
  }
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      <HotelContext.Provider value={{ hotelDetail }}>
        <HotelDetailComponent params={query} />
      </HotelContext.Provider>
      <Box className='fixed bottom-0 left-0 right-0 z-10'>
        <Button
          fill
          responsive
          large
          className='rounded-xl'
          onClick={onBookNow}
        >
          Book Now
        </Button>
      </Box>
    </Page>
  );
}
export default HotelPage;
