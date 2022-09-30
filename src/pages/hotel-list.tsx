
import { Page, useStore, Title, Box, Text, zmp } from 'zmp-framework/react';
import React, { useState, useRef, useEffect, useCallback } from "react"
import { userInfo } from 'zmp-sdk';
import HotelItem from '../components/hotel-item'
import setHeader from '../services/header';
import { changeStatusBarColor } from '../services/navigation-bar';
import {
  showNavigationBar
} from '../components/navigation-bar';
import store from '../store';

const HotelList = () => {
  const { hotelList, skip = 0, limit = 10, hasMore } = useStore('hotelList');
  const allowInfinite = useRef(true)
  const vlEl = useRef(null)
  const [vlData, setVlData] = useState({
    items: hotelList,
  })
  useEffect(() => {
    if (!hotelList.length) {
      store.dispatch("hotelList", { skip: 0, limit: 10, showSkeleton: true })
    }
  }, [])
    useEffect(() => {
    allowInfinite.current = hasMore
    if (vlEl.current) {
      const virtualList = vlEl.current?.zmpVirtualList()
      virtualList.items = [...hotelList]
      virtualList.update()
    }
  }, [hotelList])
  const loadMore = () => {
    if (!allowInfinite.current) return
    allowInfinite.current = false
    if (hasMore) {
      store.dispatch("hotelList", {
        skip: skip + limit,
        limit,
        showSkeleton: false,
      })
    }
  }
  const refreshPage = (done) => {
    store
      .dispatch("hotelList", {
        skip: 0,
        showSkeleton: true,
        reset: true,
      })
      .finally(() => {
        done()
      })
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
        >
          <Box mx='4' mt='5'>
            <Title size='small'>Danh sách khách sạn</Title>
            {hotelList.map((hotel) => (
              <Box key={hotel.sn} mx='0' my='3'>
                <HotelItem
                  layout='list-item'
                  hotel={hotel}
                  after={
                    <Text size='small' className='text-gray-500'>
                      {hotel.address}
                    </Text>
                  }
                />
              </Box>
            ))}
          </Box>
        </Page>
      </div>
    </>
  );
};

export default HotelList;
