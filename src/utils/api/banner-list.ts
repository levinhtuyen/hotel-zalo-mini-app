import apiCaller from "../apiCaller";

async function getApiBannerList()
{
  return await apiCaller.get('/v5/web-booking/homePage/getBannerList')
}

export {
  getApiBannerList
}
