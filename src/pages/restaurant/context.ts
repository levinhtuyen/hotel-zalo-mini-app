import { createContext } from "react";
import { Restaurant } from "../../models";

const HotelContext = createContext({
  hotelDetail: {} as any,
})

export default HotelContext;
