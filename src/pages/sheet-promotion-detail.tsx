import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Box,
  Sheet,
  Card,
  Title,
  useStore,
} from 'zmp-framework/react';
import getImgUrl from '../utils/img-url';
import store from '../store';

function SheetPromotionDetail({ zmproute, zmprouter }) {
  const dataPromotionDetail = useStore('dataPromotionDetail');
  useEffect(() => {
    if (!dataPromotionDetail.length) {
      const query = {
        promotionSn: zmproute.query.promotionSn,
      };
      store.dispatch('getDataPromotionDetail', query);
    }
  }, []);
  return (
    <Sheet
      backdrop
      swipeToClose
      swipeToStep
      className='h-full top-10'
      closeButton
      title="Promotion detail"
      bottom
    >
        <div className='overflow-hidden'>
        {dataPromotionDetail && (<>
          <div className=' overflow-scroll h-[42rem]' >
            <Card >
              <div className='flex items-center justify-center px-4'>
                <div className='max-w-sm h-full  rounded-xl bg-white shadow-md duration-200 hover:scale-105  hover:shadow-xl'>
                  <img
                    src={getImgUrl(dataPromotionDetail.imagePath)}
                    alt='plant'
                    className='h-auto w-full'
                  />
                  <div className='p-5'>
                    <Title size='large'>{dataPromotionDetail.title}</Title>
                    <button className='w-full rounded-md bg-[#ff6400] py-2 text-indigo-100 font-semibold  hover:shadow-md duration-75'>
                      SỬ DỤNG
                    </button>
                  </div>
                </div>
              </div>
            </Card>
            <Box >
              <div className='flex items-center justify-center '>
                <div className='max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl'>
                  <div className='p-5'> { ReactHtmlParser (dataPromotionDetail.content) } </div>
                </div>
              </div>
            </Box>
          </div>
        </>)}
        </div>
    </Sheet>
  );
}

export default SheetPromotionDetail;
