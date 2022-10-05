
import { Page, useStore, Title, Box, Text, zmp, List,Card } from 'zmp-framework/react';
import React, { useState, useRef, useEffect, useCallback } from "react"
import { userInfo } from 'zmp-sdk';
import HotelItem from '../components/hotel-item'
import setHeader from '../services/header';
import { changeStatusBarColor } from '../services/navigation-bar';
import {
  showNavigationBar
} from '../components/navigation-bar';
import store from '../store';
import SkeletonBlockHotel1 from '@components/skeleton-block/skeleton-block-hotel-1';

const HotelList = ({ zmproute }) => {
  let sn = 0
  if (zmproute.query) {
    sn = zmproute.query.districtSn;
  }
  const { limit,skip, dataHotelList, hasMore } = useStore('hotelListPage');
  const allowInfinite = useRef(true)
  const vlEl:any = useRef(null)
  const loading = useStore("loadHotelList")
  const [vlData, setVlData] = useState({
    items: dataHotelList,
  })
  useEffect(() => {
    if (dataHotelList?.length === 0) {
      store.dispatch("getHotelListPage", { skip: 0, limit: 10, showSkeleton: true, provinceSn : 1, districtSn : sn })
    }
  }, [])
  useEffect(() => {
    allowInfinite.current = hasMore
    if (vlEl.current) {
      const virtualList = vlEl.current?.zmpVirtualList()
      virtualList.items = [...dataHotelList]
      virtualList.update()
    }
  }, [dataHotelList])

  const loadMore = () => {
    if (!allowInfinite.current) return
    allowInfinite.current = false
    if (hasMore) {
      store.dispatch("getHotelListPage", {
        skip: skip + limit,
        limit:10,
        showSkeleton: false,
        reset: false,
        provinceSn: 1,
        districtSn: sn
      })
    }
  }
  const refreshPage = (done) => {
    store
      .dispatch("getHotelListPage", {
        skip: 0,
        limit:10,
        showSkeleton: true,
        reset: true,
        provinceSn: 1,
        districtSn: sn
      })
      .finally(() => {
        done()
      })
  }
  return (
    <>
      <div>
        <Page
          ptr
          onPtrRefresh={refreshPage}
          onPageBeforeIn={() => {
            showNavigationBar;
          }}
          infinite
          infiniteDistance={50}
          infinitePreloader={!loading && hasMore}
          onInfinite={loadMore}
        >
          <Box>
            <Title>Hotel list</Title>
          </Box>
          <Box>
          
          <List
            noHairlines
          >
            <ul style={{ backgroundColor: `rgb(244 245 246)` }}>
            {dataHotelList.map((item, index) => (
                <HotelItem
                layout='list-page'
                hotel={item}
                key={index}
                after={
                  <Text size='small' className='text-gray-500'>
                    {item.address}
                  </Text>
                }
              />
              ))}
            </ul>
          </List>
          </Box>
        </Page>
      </div>
    </>
  );
};

export default HotelList;
