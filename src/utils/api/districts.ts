import apiCaller from "../apiCaller";

async function getApiDistrict(query)
{
  return await apiCaller.get('/v2/web-booking/chooseArea/findAllDistrictByProvinceSn',{params: query})
}

export {
  getApiDistrict
}
