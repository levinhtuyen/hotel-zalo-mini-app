import {
  Card,
  Link,
  Box,
  Text,
  Title,
  SkeletonBlock,
  SkeletonText,
  Button,
} from 'zmp-framework/react';
import { FunctionComponent } from 'react';
import getImgUrl from '../../utils/img-url';
interface BookingDetailProps {
  bookingDetail: any;
  loading: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
}
const BookingDetailItem: FunctionComponent<BookingDetailProps> = ({
  loading,
  bookingDetail,
  before,
  after,
}) => {
  if (loading) {
    return (
      <Box mx='0' my='3' className='post'>
        <Card inset className='overflow-hidden shadow-3	p-0'>
          <Link noLinkClass>
            <Box m='0' flex flexDirection='row' alignItems='stretch'>
              <div className='post-thumbnail overflow-hidden'>
                <SkeletonBlock
                  tag='div'
                  borderRadius='5'
                  width={'92'}
                  height={'120'}
                  effect='fade'
                />
              </div>
              <Box
                m='0'
                py='5'
                mx='5'
                flex
                flexDirection='column'
                className='flex-1'
              >
                <SkeletonText tag='span' effect='fade'>
                  Lorem ipsum{' '}
                </SkeletonText>
                <SkeletonText tag='span' effect='fade'>
                  Lorem ipsum dolor sit amet consectetur
                </SkeletonText>
              </Box>
            </Box>
          </Link>
        </Card>
      </Box>
    );
  }
  return (
    <Box mx='0' my='3' className='post'>
      <Card inset className='overflow-hidden shadow-3	p-0'>
        <Box>
          <Box m='0' alignItems='stretch'>
            <div className='post-thumbnail overflow-hidden'>
              <Title className='text-[18px]'>Thông tin đặt phòng</Title>
            </div>
            <Box m='0' flex className='max-h-full'>
              <div className='flex-none aspect-card relative w-32'>
                <img
                  src={getImgUrl(bookingDetail.imagePath)}
                  className='absolute w-full h-full object-cover rounded-xl'
                />
              </div>
              <Box>
                <Title className='text-[16px] font-semibold limit-text-2-line'>
                  {bookingDetail.hotelName}
                </Title>
                {before}
                <Title className='limit-text-2-line h-48' size='small'>
                  {bookingDetail.roomTypeName}
                </Title>
                {after}
                <Title size='small' className='limit-text-3-line'>
                  <span className='text-gray-500'>
                    {bookingDetail.hotelAddress}
                  </span>
                </Title>
              </Box>
            </Box>
          </Box>
          <Box m='0' mt='10' alignItems='stretch'>
            <Title>Thông tin thanh toán</Title>
            <Box
              m='0'
              flex
              className='max-h-full flex justify-between text-gray-500'
            >
              <Title size='small'>Tiền phòng</Title>
              <Title size='small'>{bookingDetail.hotelFee}</Title>
            </Box>
            <Box
              m='0'
              flex
              className='max-h-full flex justify-between text-gray-500'
            >
              <Title size='small'>Giờ cao điểm</Title>
              <Title size='small'>{bookingDetail.highDemand}</Title>
            </Box>
            <Box
              m='0'
              flex
              className='max-h-full flex justify-between text-gray-500'
            >
              <Title size='small'>Giảm giá</Title>
              <Title size='small'>
                {bookingDetail.totalDiscount
                  ? -bookingDetail.totalDiscount
                  : ''}
              </Title>
            </Box>
            <hr />
            <Box
              mt='5'
              ml='0'
              flex
              className='max-h-full flex justify-between text-gray-800'
            >
              <Title>Tổng thanh toán</Title>
              <Title>{bookingDetail.amountFromUser}</Title>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default BookingDetailItem;
