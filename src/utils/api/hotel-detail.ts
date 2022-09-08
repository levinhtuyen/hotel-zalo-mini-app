import apiCaller from "../apiCaller";

async function getHotelDetail(payload)
{
  return await apiCaller.post('/getHotelDetail', payload)
}

export {
  getHotelDetail
}
