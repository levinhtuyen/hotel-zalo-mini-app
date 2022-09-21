import {
  Title,
  Box,
  Icon
} from 'zmp-framework/react';
import getImgUrl from '../utils/img-url'
const RoomList = (props) => {

  return (
    <Box>
        <Box mx='4' mt='6'>
          <Title size='small'>Danh sách phòng</Title>
        </Box>
        {props?.roomList?.length ? (
          <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
            <Box m='0' pr='4' flex className='w-max '>
              {props.roomList.map((room, index) => (
                <Box
                  key={index}
                  ml='4'
                  mr='0'
                  className='snap-start h-full relative  bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'
                  style={{ width: 'calc(100vw - 120px)' }}
                >
                  <Box m='0' flex className='h-36 max-h-full'>
                    <div className='flex-none aspect-card relative w-32'>
                      <img
                        src={getImgUrl(room.hotelImage)}
                        className='absolute w-full h-full object-cover rounded-xl'
                      />
                    </div>
                    <Box my='4' mx='5'>
                      <Title className='limit-text-2-line h-48' size='small'>
                        {room.roomTypeName}
                      </Title>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            
          </div>
        ) : (
          <Box mx='4'>Khách sạn này không có phòng</Box>
        )}
        <Box className='h-40'></Box>
      </Box>
  );
}
export default RoomList;
