import apiCaller from "../apiCaller";

async function getApiHotelSearchKeyword(keyword)
{
  return await apiCaller.get('v5/web-booking/hotel/getSearchSuggestion',{params : keyword})
}

export {
  getApiHotelSearchKeyword
}
