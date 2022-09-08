import { HotelDetail } from '../../models';
import { createContext } from "react";

const HotelContext = createContext({
  hotel: {} as HotelDetail,
})

export default HotelContext;
