import {
  Card,
  Link,
  Box,
  Text,
  Title,
  SkeletonBlock,
  SkeletonText,
} from 'zmp-framework/react';

const BookingDetailItem = ({ loading, dataBooking }) =>
{
  if (loading)
  {
    return (
      <Box mx='0' my='3' className='post'>
        <Card inset className='overflow-hidden shadow-3	p-0'>
          <Link noLinkClass>
            <Box m='0' flex flexDirection='row' alignItems='stretch'>
              <div className='post-thumbnail overflow-hidden'>
                <SkeletonBlock tag='' borderRadius='5' width={'92'} height={'120'} effect='fade' />
              </div>
              <Box
                m='0'
                py='5'
                mx='5'
                flex
                flexDirection='column'
                className='flex-1'
              >
                <SkeletonText tag='' effect='fade'>Lorem ipsum </SkeletonText>
                <SkeletonText tag='' effect='fade'>
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
          <Box m='0' flex flexDirection='row' alignItems='stretch'>
            <div className='post-thumbnail overflow-hidden'>
              <Title>12323</Title>
            </div>
            <Box
              m='0'
              py='5'
              mx='5'
              flex
              flexDirection='column'
              className='flex-1'
            >
              <Title className='post-title text-blue font-extrabold'>
                12323
              </Title>
              <Text
                size='small'
                bold
                className='desc text-blue-dark overflow-ellipsis'
              >
                5423
              </Text>
              <Box m='0' flex flexDirection='row' justifyContent='flex-end'>
                <Box m='0' flex flexDirection='row' alignItems='center'>
                  <Box>123232</Box>
                  <Text className='like text-blue-dark'>123232</Text>
                </Box>
                <Box m='0' ml='2' flex flexDirection='row' alignItems='center'>
                  <Text className='time text-blue-dark'>123232</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
export default BookingDetailItem;
