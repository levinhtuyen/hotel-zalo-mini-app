
import {
  Box,
  Title,
  SkeletonBlock,
  SkeletonText,
  SkeletonImage,
  useStore,
} from 'zmp-framework/react';
const SkeletonBlockHotel2 = () => {
  return (
    <Box
        ml='4'
        mr='0'
        className='snap-start'
        style={{ width: 'calc(100vw - 120px)' }}
      >
      <div
          className='relative  bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'
        >
        <div className='aspect-cinema relative'>
          <Box className='absolute object-cover'>
            <SkeletonImage
              color=''
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
  );
}
export default SkeletonBlockHotel2;
