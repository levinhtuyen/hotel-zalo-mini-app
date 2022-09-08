import { Box, Page, Button } from 'zmp-framework/react';
import { useHotel } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import HotelContext from "./hotel/context";
import HotelDetail from "./hotel/detail";

function HotelPage({ zmproute }) {
  const hotel = useHotel(zmproute.query.id)!;
  const onBookNow = () =>
  {
    
  };
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      <HotelContext.Provider value={{ hotel }}>
        <HotelDetail />
      </HotelContext.Provider>
      <Box height={200}></Box>
      <Box

        className='fixed bottom-0 left-0 right-0 z-10'
      >
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
