import apiCaller from "../apiCaller";

async function getApiQuickFilter(params)
{
  return await apiCaller.post('/v5/web-booking/hotel/getHotelList',params)
}

export default {
  getApiQuickFilter
}
