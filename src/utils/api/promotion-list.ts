import apiCaller from "../apiCaller";

async function getApiPromotionList(params)
{
  return await apiCaller.get('/v5/web-booking/reward/getPromotionList',{params: params} )
}

export {
  getApiPromotionList
}
