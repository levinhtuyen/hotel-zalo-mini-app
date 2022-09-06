import { createContext } from "react";
import { Hotel } from "../../models";

const HotelContext = createContext({
  hotel: {} as Hotel,
})

export default HotelContext;
