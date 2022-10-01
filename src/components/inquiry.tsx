import {
  Button,
  Searchbar,
  useStore,
  zmp,
  List,
  ListItem,
  Avatar,
  Card,
  Box,
  Preloader,
  Title,
} from 'zmp-framework/react';
import { District } from '../models'
import store from "../store";
import { useEffect, useState } from 'react';
import ChooseLocation from "./modal/ChooseLocation";
import { debounce } from 'lodash';

function Inquiry() {
  const keyword = useStore('keyword') as string;
  const loading = useStore('loadingSearchKeyword');
  const hotelSearch = useStore('hotelSearch');
  const logo = 'https://go2joy.vn/images/logo-mini.png';
  const setKeyword = async (s: string) =>
  {
    await store.dispatch('setKeyword', s);
    if (!s)
    {
      return
    }
    setFocusDisplay('block');
    setFocusIndex('100')
    getApiSearchKeyword()
    
  }
  const [focusDisplay, setFocusDisplay] = useState('none');
  const [focusIndex, setFocusIndex] = useState('0')
  const getApiSearchKeyword = debounce(() => {
    store.dispatch('getHotelSearchKeyword');
  }, 500);

  const clickToHotelDetail = (sn) =>
  {
    zmp.views.main.router.navigate({
      path: '/hotel-detail/',
      query: {
        hotelSn: sn,
        bookingType: 1,
      },
    });
  }
  const handleBlur = () =>
  {;
    setFocusDisplay('none');
    setFocusIndex('1')
  }
  useEffect(() => {
    let ignoreClickOnMeElement : any = document.getElementById('blurSearch');
    document.addEventListener('click', function (event) {
        var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
        if (!isClickInsideElement) {
          setFocusDisplay('none');
          setFocusIndex('1')
        }
    });
  })
  return (
    <>
      <Searchbar
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        clearButton={false}
        className='inquiry z-40'
        placeholder='Tìm kiếm'
        
      />
      <div id='blurSearch' onBlur={handleBlur}>
        <Card className='list-card p-0'  >
          {loading ? (
            <>
              {' '}
              <Box mx='4' mt='5'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Preloader logo={logo} />
                </div>
              </Box>
            </>
          ) : (
            <>
              <List
                className='searchbar-found'
                mediaList
                virtualList
                style={{ display: `${focusDisplay}`, zIndex: `${focusIndex}` }}
                virtualListParams={{
                  height: 80,
                }}
                
              >
                {hotelSearch?.length === 0 && keyword ? (
                  <>
                    <Title size='small'>Không tìm thấy khách sạn nào</Title>
                  </>
                ) : (
                  <>
                    <ul>
                      {hotelSearch?.hotelList?.map((item, index) => (
                        <ListItem
                          key={index}
                          mediaItem
                          link='#'
                          title={item.name}
                          subtitle={item.address}
                          style={{ top: `${hotelSearch.topPosition}px` }}
                          onClick={() => clickToHotelDetail(item.sn)}
                          
                        >
                          <Title slot='sn'>{item.sn}</Title>
                          <Avatar slot='media'>
                            <img
                              src={logo}
                              className='absolute w-full h-full object-cover'
                            />
                          </Avatar>
                        </ListItem>
                      ))}
                    </ul>
                  </>
                )}
              </List>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

export function QuickFilter() {
  const selectedDistrict = useStore('selectedDistrict') as number;
  const setSelectedDistrict = (districtId: number) =>
  {
    store.dispatch('changeDistrict', districtId);
  }
  const viewHotelList = (sn) => {
    zmp.views.main.router.navigate({
      path: '/hotel-list',
      query: {
        districtSn: sn,
      },
    });
  }
  const [customSheetOpened, setCustomSheetOpened] = useState(false);
  const parentHandleChange = (e) => {
    setCustomSheetOpened(false)
  };
  const openModalLocation = () =>
  {
    setCustomSheetOpened(true);
  }
  const districts = useStore('districts') as District[];
  return (
    <div className='overflow-auto no-scrollbar snap-x snap-mandatory z-50 relative'>
      <div className='flex w-max'>
        <Button
          onClick={() => setSelectedDistrict(0)}
          typeName={!selectedDistrict ? 'primary' : 'tertiary'}
          className='mr-3 snap-start'
          fill
        >
          Tất cả
        </Button>
        <Button
          typeName='tertiary'
          className='mr-3 snap-start'
          onClick={() => openModalLocation()}
          fill
        >
          Chọn vị trí
        </Button>
        <ChooseLocation
          handleChange={parentHandleChange}
          customSheetOpened={customSheetOpened}
        />
        {districts.map((district) => (
          <Button
            key={district.sn}
            typeName={selectedDistrict === district.sn ? 'primary' : 'tertiary'}
            className='mr-3 snap-start'
            fill
            onClick={()=> viewHotelList(district.sn)}
          >
            {district.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Inquiry;
