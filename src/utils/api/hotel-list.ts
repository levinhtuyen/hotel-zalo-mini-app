import apiCaller from "../apiCaller";

async function getHotelList()
{
  const payload = {
    bookingType: 1,
    checkInDatePlan: "2022-09-08",
    endDate: "2022-09-08",
    endTime: "12:30",
    facility: [],
    latitude: 10.7642788,
    limit: 20,
    longitude: 106.6813247,
    maxPrice: 10000000,
    minPrice: 20000,
    page: 1,
    promotion: [],
    provinceSn: 1,
    sort: 1,
    startTime: "10:30",
  }
  return await apiCaller.post('/v5/web-booking/hotel/getHotelList', payload)
}

export {
  getHotelList
}
