
import {
  Box,
  Card,
  SkeletonBlock,
  SkeletonText,
  SkeletonImage,
  useStore,
} from 'zmp-framework/react';
const SkeletonBlockHotel1 = () => {
    return (
      <Box mx='0' my='3' className='post'>
        <Card inset className='overflow-hidden shadow-3	p-0'>
          <Box m='0' height={100} flex flexDirection='row' alignItems='stretch'>
            <div className='post-thumbnail overflow-hidden'>
              <SkeletonBlock
                tag='div'
                borderRadius='5'
                width='92'
                height='320'
                effect='fade'
              />
            </div>
            <Box>
              <SkeletonImage
                tag='div'
                color=''
                borderRadius='18'
                showIcon
                iconColor='gray'
                width={100}
                height={100}
                effect='wave'
              />
            </Box>
            <Box
              m='0'
              py='5'
              mx='5'
              flex
              flexDirection='column'
              className='flex-1'
            >
              <SkeletonText tag='span' effect='fade'>
                Lorem ipsum
              </SkeletonText>
              <SkeletonText tag='span' effect='fade'>
                Lorem ipsum dolor sit amet consectetur
              </SkeletonText>
            </Box>
          </Box>
          <Box>
            <SkeletonText tag='span' effect='fade'>
              Lorem ipsum dolor sit amet consectetur consectetur
            </SkeletonText>
            <SkeletonText tag='span' effect='fade'>
              Lorem ipsum dolor sit amet consectetur consectetur consectetur 123 234
            </SkeletonText>
          </Box>
        </Card>
      </Box>
    );
}
export default SkeletonBlockHotel1;
