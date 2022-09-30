
import { Page, useStore, Title, Box, Text, zmp, List } from 'zmp-framework/react';
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
  const vlEl = useRef(null)
  const loading = useStore("loadHotelList")
  let pageContent: any = ''
  const [vlData, setVlData] = useState({
    items: dataHotelList,
  })
  useEffect(() => {
    if (!dataHotelList?.length) {
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
  const renderExternal = (vl, newData) => {
    setVlData({ ...newData })
  }
  const loadMore = () => {
    console.log('Load more');
    console.log('hasMore :>> ', hasMore);
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
  if (loading) {
    pageContent = (
      <div className="posts">
          <SkeletonBlockHotel1 />
          <SkeletonBlockHotel1 />
          <SkeletonBlockHotel1 />
      </div>
    )
  } else {
    pageContent = (
      <List
        ref={vlEl}
        noHairlines
        className=""
        virtualList
        noHairlinesBetween
        virtualListParams={{
          items: dataHotelList,
          renderExternal,
          height: 146,
        }}
      >
        <ul >
          {vlData.items.map((item, index) => (
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
    )
  }
  return (
    <>
      <div>
        <Page
          name='hotel-list'
          key='hotel-list'
          ptr
          onPtrRefresh={refreshPage}
          onPageBeforeIn={() => {
            zmp.toolbar.show('#view-hotel-list', true);
            showNavigationBar;
            setHeader({ title: 'Hotel List', type: 'primary' });
            changeStatusBarColor('secondary');
          }}
          infinite
          infiniteDistance={50}
          infinitePreloader={!loading && hasMore}
          onInfinite={loadMore}
        >
          <Box>
            {pageContent}
          </Box>
        </Page>
      </div>
    </>
  );
};

export default HotelList;
