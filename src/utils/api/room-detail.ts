import apiCaller from "../apiCaller";

async function getRoomDetail(params)
{
  return await apiCaller.get('/v4/web-booking/hotel/getRoomTypeDetail', {params: params})
}

export {
  getRoomDetail
}
