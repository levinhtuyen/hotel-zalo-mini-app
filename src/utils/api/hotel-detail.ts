import apiCaller from "../apiCaller";

async function getHotelDetail(params)
{
  return await apiCaller.get('/v4/web-booking/hotel/getHotelDetail', {params: params})
}

export {
  getHotelDetail
}
