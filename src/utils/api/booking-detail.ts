import apiCaller from "../apiCaller";

async function getApiBookingDetail(params)
{
  return await apiCaller.get('/v5/web-booking/booking/getBookingDetail', {params: params})
}

export {
  getApiBookingDetail
}
