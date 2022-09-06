import { Box, Page } from "zmp-framework/react";
import { useHotel } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import HotelContext from "./hotel/context";
import HotelDetail from "./hotel/detail";

function HotelPage({ zmproute }) {
  const hotel = useHotel(zmproute.query.id)!;

  return <Page onPageBeforeIn={hideNavigationBar} onPageBeforeOut={showNavigationBar}>
    <HotelContext.Provider value={{ hotel }}>
      <HotelDetail />
    </HotelContext.Provider>
    <Box height={200}></Box>
  </Page>;
}

export default HotelPage;
