import { useMemo, useState, useEffect } from 'react';
import { Box, Button, useStore, Preloader } from 'zmp-framework/react';
import RoomItem from './room';
import store from '../../../store';

function TabRoom(props) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const logo = '/src/static//logo-app.png';
  const listRoom: any = useStore('listRoom');
  const loading = useStore('loadingListRoom');
  useEffect(() => {
    if (!listRoom?.length) {
      store.dispatch('getListRoom', props.params);
    }
  }, []);
  if (loading)
  {
    return (
      <>
        <Box mx='4' mt='5'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Preloader logo={logo} />
          </div>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box className='overflow-x-auto no-scrollbar snap-mandatory snap-x scroll-p-4'>
        <Box flex className='w-max'>
          {Object.keys(listRoom)?.map((obj, index) => (
            <Button
              key={index}
              className={`border-b-2 rounded-none px-4 snap-start ${
                selectedCategory === index ? 'border-primary' : ''
              }`}
              typeName={selectedCategory === index ? undefined : 'ghost'}
              onClick={() => setSelectedCategory(index)}
            >
              {obj}
            </Button>
          ))}
        </Box>
      </Box>
      <Box flex flexWrap justifyContent='flex-start'>
        {listRoom?.roomTypeList?.map((room) => (
          <Box key={room.sn} className="w-full">
            <RoomItem room={room} />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default TabRoom;
