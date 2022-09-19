import apiCaller from "../apiCaller";

async function getApiHotelPopular(params)
{
  return await apiCaller.post('/v5/web-booking/hotel/getHotelList',params)
}

export default {
  getApiHotelPopular
}
