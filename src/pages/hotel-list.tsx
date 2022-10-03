
import { Page, useStore, Box, Title, zmp, List,Card,Button } from 'zmp-framework/react';
import React, { useState, useRef, useEffect } from "react"
import HotelItem from '../components/hotel-item'
import {
  showNavigationBar
} from '../components/navigation-bar';
import Distance from '../components/distance';
import store from '../store';
import SkeletonBlockHotel1 from '@components/skeleton-block/skeleton-block-hotel-1';
import getImgUrl from '../utils/img-url';
const HotelList = ({ zmproute }) => {
  let sn = 0
  if (zmproute.query) {
    sn = zmproute.query.districtSn;
  }
  const allowInfinite = useRef(true)
  const { limit,skip, dataHotelList, hasMore } = useStore('hotelListPage');
  
  // const vlEl = useRef(null)
  const loading = useStore("loadHotelList")
  let pageContent: any = ''
  const [vlData, setVlData] : any = useState({
    items: dataHotelList,
  })
  useEffect(() => {
    if (dataHotelList?.length === 0) {
      store.dispatch("getHotelListPage", { skip: 0, limit: 10, showSkeleton: true, provinceSn : 1, districtSn : sn })
    }
  }, [])
  // useEffect(() => {
  //   allowInfinite.current = hasMore
  //   if (vlEl.current) {
  //     const virtualList = vlEl.current?.zmpVirtualList()
  //     virtualList.items = [...dataHotelList]
  //     virtualList.update()
  //   }
  // }, [dataHotelList])
  
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
  const renderExternal = (vl, newData) => {
    setVlData({ ...newData })
  }
  const viewDetail = (hotel) => {
    // currentRoute.path.startsWith('/hotel-detail');
    const query = { hotelSn: hotel.sn, bookingType: hotel.bookingType };
    store.dispatch('getHotelDetail', query);
    zmp.views.current?.router.navigate({
      path: '/hotel-detail',
      query: {
        hotelSn: hotel.sn,
        bookingType: hotel.bookingType,
      },
    });
  };
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
        virtualList
        virtualListParams={{
          items: dataHotelList,
          renderExternal,
          height: 50,
        }}
      >
        <ul style={{ backgroundColor: `rgb(244 245 246)` }}>
        {vlData.items.map((item, index) => (
            <div
            key={index}
            onClick={() => viewDetail(item)}
            className='border-gray-700 bg-white restaurant-with-cover mt-4'
              >
                <Box m='0' flex className='h-36 max-h-full'>
                  <div className='flex-none aspect-card relative w-32'>
                    <img
                      src={getImgUrl(item.hotelImage)}
                      className='absolute w-full h-full object-cover rounded-xl'
                    />
                  </div>
                  <Box my='4' mx='5'>
                    <Title className='limit-text-2-line h-48' size='small'>
                      {item.name}
                    </Title>
                    <Box mx='0' mb='0' flex>
                      <Button
                        iconZMP='zi-star-solid'
                        small
                        className='text-yellow-400 pl-0'
                      >
                        <span className='text-gray-500'>{item.averageMark}</span>
                      </Button>
                      <Button iconZMP='zi-send-solid' small>
                        <span className='text-gray-500'>
                          <Distance
                            location={{ lat: item.latitude, long: item.longitude }}
                          />
                        </span>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </div>
          ))}
        </ul>
      </List>
    )
  }
  return (
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
    <Box  mx='4' mt='5'>
      <Title>Hotel list</Title>
    </Box>
    <Box  mx='4' mt='5'>
      {pageContent}
    </Box>
  </Page>
  );
};

export default HotelList;
