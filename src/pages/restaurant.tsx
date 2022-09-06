import { Box, Page } from "zmp-framework/react";
import { useHotel } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import RestaurantContext from "./restaurant/context";
import RestaurantDetail from "./restaurant/detail";

function HotelPage({ zmproute }) {
  const hotel = useHotel(zmproute.query.id)!;

  return <Page onPageBeforeIn={hideNavigationBar} onPageBeforeOut={showNavigationBar}>
    <RestaurantContext.Provider value={{ hotel }}>
      <RestaurantDetail />
    </RestaurantContext.Provider>
    <Box height={200}></Box>
  </Page>;
}

export default HotelPage;
