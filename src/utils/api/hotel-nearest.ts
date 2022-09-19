import apiCaller from "../apiCaller";

async function getApiHotelNearest(payload)
{
  return await apiCaller.post('/v5/web-booking/hotel/getHotelList',payload)
}

export default {
  getApiHotelNearest
}
