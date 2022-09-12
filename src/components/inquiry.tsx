import { Button, Searchbar, useStore,zmp } from "zmp-framework/react";
import { District } from '../models'
import store from "../store";
import { useState } from 'react';
import ChooseLocation from "./modal/ChooseLocation";
function Inquiry() {
  const keyword = useStore('keyword') as string;
  const setKeyword = (s: string) => {
    store.dispatch('setKeyword', s);
  }
  return <Searchbar value={keyword} onChange={(e) => setKeyword(e.target.value)} className="inquiry" placeholder="Tìm kiếm" />;
}

export function QuickFilter() {
  const selectedDistrict = useStore('selectedDistrict') as number;
  const setSelectedDistrict = (districtId: number) =>
  {
    store.dispatch('changeDistrict', districtId);
  }
  const viewHotelList = () => {
    zmp.views.main.router.navigate({
      path: '/hotel-list',
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
    <div className='overflow-auto no-scrollbar snap-x snap-mandatory'>
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
            onClick={viewHotelList}
          >
            {district.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Inquiry;
