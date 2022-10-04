import { FunctionComponent,useState } from 'react';
import { Box, Button, Icon, Text, Title, zmp,  SkeletonText,SkeletonImage, } from 'zmp-framework/react';
import { Hotel, HotelListDetail } from '../models';
import Distance from './distance';
import DistrictName from './district-name';
import getImgUrl from '../utils/img-url';
import { useCurrentRoute } from '../hooks';
import store from '../store';

interface PromotionProps {
  promotion?: any;
  loading?: Boolean,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PromotionItem: FunctionComponent<PromotionProps> = ({
  promotion,
  loading
}) => {
  const [selectingState, setSelectingState] = useState(false);
  console.log('promotion :>> ', promotion);
  if(loading) {
    return (
      <div className='bg-white relative m-4'>
        <Box
          ml='4'
          mr='0'
          className='snap-start'
          style={{ width: 'calc(100vw - 120px)' }}
        >
        <div
            className='to-transparent flex flex-wrap gap-4 h-64 overflow-hidden p-4 relative w-full z-20'
          >
          <div className='aspect-cinema relative'>
            <Box className='absolute object-cover'>
              <SkeletonImage
                borderRadius='18'
                showIcon
                iconColor='gray'
                effect='wave'
                className=' w-full h-full'
              />
            </Box>
          </div>
          <Box mt='10'>
            <SkeletonText tag='span' effect='fade'>
              Lorem ipsum dolor sit amet consectetur 
            </SkeletonText>
            <SkeletonText tag='span' effect='fade'>
              Lorem ipsum dolor sit amet consectetur 
            </SkeletonText>
          </Box>
        </div>
        </Box>
      </div>
    )
  }
  return (
    <div
      className='bg-white relative m-4'
    >
      <div className='to-transparent flex flex-wrap gap-4 h-64 overflow-hidden p-4 relative w-full z-20'>
        <Box m='0' className='h-36 max-h-full w-full'>
          <div className='aspect-card relative w-full h-full'>
        
            <img
              src={getImgUrl(promotion.imagePath)}
              className='absolute w-full h-36 object-cover rounded-xl'
            />
          </div>
          
        </Box>
        <Box m='0' className='h-40 max-h-full w-full'>
          <Box m='0' flex justifyContent='space-between'>
          <Title className='w-64 line-clamp-2'>{promotion.title} <Text>Hết hạn : {promotion.expiredDate}</Text></Title>
          <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectingState(false);
                  zmp.views.main.router.navigate({
                    path: '/sheet-promotion-detail/',
                    query: {
                      promotionSn: promotion.sn,
                    },
                  });
                }}
                typeName='primary'
                responsive
                className='w-32 bg-[#ff6400] text-[#fff]'
              >
                Xem chi tiết
              </Button>
          </Box>
        </Box>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-full top-0 w-full z-10'>
        <img className='w-full h-full' src="https://go2joy.vn/images/bg-coupon-card.png" alt={promotion.title} />
      </div>
    </div>
  );
};

export default PromotionItem;
