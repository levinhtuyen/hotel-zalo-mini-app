import {
  Title,
  Box,
  Icon,
  zmp
} from 'zmp-framework/react';
import getImgUrl from '../utils/img-url'
const RoomList = (props) => {
  const directRoomDetail = (room) => {
    zmp.views.main.router.navigate({
      path: '/room-detail',
      query: {
        roomTypeSn: room.roomTypeSn,
        bookingType: 1
      },
    });
  }
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
                  <div onClick={() => directRoomDetail(room)}>
                    <Box  m='0' flex className='h-36 max-h-full'>
                      <div  className='flex-none aspect-card relative w-32'>
                        <img
                          src={getImgUrl(props?.hotelImage)}
                          className='absolute w-full h-full object-cover rounded-xl'
                        />
                      </div>
                      <Box my='4' mx='5'>
                        <Title className='text-orange-400 limit-text-2-line h-48' size='small'>
                          {room.roomTypeName}
                        </Title>
                        {
                          room.applyFlashSale ? 'Flash Sale' : 'No Flash Sale'
                        }
                        
                        <Title className='text-zinc-400' size='small'>roomSn : {room.sn}</Title>
                      </Box>
                    </Box>
                  </div>
                </Box>
              ))}
            </Box>
            
          </div>
        ) : (
          <Box mx='4'>Khách sạn này không có phòng</Box>
        )}
      </Box>

      
  );
}
export default RoomList;
