import { createContext } from "react";
import { Hotel } from "../../models";

const RestaurantContext = createContext({
  hotel: {} as Hotel,
})

export default RestaurantContext;
