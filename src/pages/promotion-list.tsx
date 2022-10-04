import { useEffect, useState } from 'react';
import { Box, Button, Page, useStore,Title } from "zmp-framework/react";
import PromotionItem from "../components/promotion-item";
import store from '../store'


function PromotionListPage() {
  const dataPromotionList = useStore('dataPromotionList');
  const loading = useStore('loadingPromotionList');
  const query = {
    page:1
  }
  useEffect(() =>
  {
    if (!dataPromotionList.length) {
      store.dispatch('getDataPromotionList',query);
    }
    
  }, []);
  
  const onClickMore = () => {
    query.page += 1
    store.dispatch('getDataPromotionList',query);
  }
  if(loading) {
    return (
      <>
      <Box  my='4' mx='5'>
        <Title>Promotion List</Title>
      </Box>
      <PromotionItem loading={loading} />
      <PromotionItem loading={loading} />
      <PromotionItem loading={loading} />
      </>
    )
  }
  return (
      <Page>
        <Box  my='4' mx='5'>
          <Title>Promotion List</Title>
        </Box>
        {!dataPromotionList?.length? (
          <Box className='text-center' mt='10'>
            Bạn không có promotion nào
          </Box>
        ) : (
          <>
            {dataPromotionList.map((promotion,index) => (
              <Box key={index} my='4'>
                <PromotionItem promotion={promotion} />
              </Box>
            ))}
          </>
        )}
        <Box py='4' px='6' flex className='align-middle center items-center justify-center justify-content-center'>
        <Button
            responsive
            large
            typeName='primary'
            onClick={() => onClickMore()}
          >
            Tải thêm
          </Button>
        </Box>
      </Page>
    );
}

export default PromotionListPage;
