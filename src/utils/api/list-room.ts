import apiCaller from "../apiCaller";

async function getApiListRoom(params)
{
  return await apiCaller.get('/v5/web-booking/hotel/getRoomTypeList', {params: params})
}

export {
  getApiListRoom
}
