import { ReactNode, useEffect, useMemo, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Box,
  Button,
  Card,
  Text,
  Title,
  useStore,
  zmp,
  Page,
} from 'zmp-framework/react';
import { showNavigationBar } from '../components/navigation-bar';
import getImgUrl from '../utils/img-url';
import store from '../store';

function Section({
  left,
  right,
  styleLeft,
  sizeLeft,
  sizeRight,
  styleRight,
}: {
  left: ReactNode;
  right: ReactNode;
  sizeLeft?: any;
  sizeRight?: any;
  styleLeft?: any;
  styleRight?: any;
}) {
  return (
    <>
      <Box m='0' flex justifyContent='space-between' alignItems='center'>
        <Title
          className={styleLeft + ' mx-6 my-4'}
          size={sizeLeft ? sizeLeft : 'small'}
        >
          {left}
        </Title>
        <Title
          size={sizeRight ? sizeRight : 'small'}
          className={styleRight + ' mx-6 my-4'}
        >
          {right}
        </Title>
      </Box>
      <hr />
    </>
  );
}

function PromotionDetail({ zmproute, zmprouter }) {
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
    <Page
      onPageBeforeIn={showNavigationBar}
      onPageBeforeOut={showNavigationBar}
      className='pb-8'
    >
      <Card >
        <div className='flex items-center justify-center px-4'>
          <div className='max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105  hover:shadow-xl'>
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
          <div className='max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 '>
            {/* <div className='p-5'> { ReactHtmlParser (dataPromotionDetail.content) } </div> */}
            <div className='p-5' dangerouslySetInnerHTML={{__html: dataPromotionDetail.content}}></div>
          </div>
        </div>
      </Box>
    </Page>
  );
}

export default PromotionDetail;
