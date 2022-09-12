import apiCaller from "../apiCaller";

async function getApiBookingList()
{
  return await apiCaller.get('/v5/web-booking/booking/getBookingList')
}

export {
  getApiBookingList
}
