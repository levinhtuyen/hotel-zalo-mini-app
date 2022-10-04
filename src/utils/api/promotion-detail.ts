import apiCaller from "../apiCaller";

async function getPromotionDetail(params)
{
  return await apiCaller.get('/v5/web-booking/reward/getPromotionDetail', {params: params})
}

export {
  getPromotionDetail
}
