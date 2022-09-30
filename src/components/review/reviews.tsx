import React, { useState, useRef, useEffect } from 'react';
import {
  Title,
  Box,
  Icon,
  Avatar,
  Text,
  Card,
  List,
  SkeletonAvatar,
  ListItem
} from 'zmp-framework/react';
const ListReview = (props) => {
  const getFistTextString = (string) => {
    return string.charAt(0);
  }
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const timmer = setTimeout(() => {
      setListLoading(false);
    }, 3000);
    return () => clearTimeout(timmer);
  }, []);
  return (
    <Box>
        <Box mx='4' mt='6'>
          <Title size='small'>ĐÁNH GIÁ</Title>
        </Box>
        <Box mx='4' mt='3'>
          <Text className='font-semibold'><Icon color='#ff6400' size='24'
              zmp='zi-star-solid'
            /> {props.hotelDetail.averageMark}/5 : {props.hotelDetail.totalReview} Đánh giá</Text>
        </Box>
        {props?.userReviewFormList?.length ? (
          <div className='overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar'>
            <Box m='0' pr='4' flex className='w-max '>
              {props.userReviewFormList.map((review, index) => (
                <Box
                  key={index}
                  ml='4'
                  mr='0'
                  className='snap-start h-full relative  bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'
                  style={{ width: 'calc(100vw - 120px)' }}
                >
                  <Box m='0' flex className='h-12 max-h-full'>
                    <Box flex flexDirection='column' alignItems='center'>
                      <Avatar size={48} story>
                        {getFistTextString(review.userNickName)}
                      </Avatar>
                      
                    </Box>
                    <Box>
                      <Text>{review.createTime}</Text>
                      <Text>Khách hàng : {review.userNickName}</Text>
                    </Box>
                    
                  </Box>
                  <Box mt='5'>
                      <Box>Phòng : 
                        <span className='font-semibold text-[14px]'> {review.roomTypeName}</span>
                      </Box>
                      <Box>
                        <Text>Đánh giá :  <Icon key={index} color='#ff6400' size='12'
                        zmp='zi-star-solid'/>
                        </Text>
                      </Box>
                    </Box>
                </Box>
              ))}
            </Box>
            
          </div>
        ) : (
          <Box mx='4'>Khách sạn này không có review</Box>
        )}
        <Box className='h-40'></Box>
      </Box>
  //   <Card inset title='ĐÁNH GIÁ'>
  //     {props?.userReviewFormList?.length ? (
  //       <List
  //         noHairlines
  //         noHairlinesBetween
  //         loading={listLoading}
  //         style={{ marginTop: '0px' }}
  //       >
  //         {listLoading ? (
  //           <>
  //             <ListItem
  //               title='This is title'
  //               description='this is description content to demo skeleton'
  //             >
  //               <SkeletonAvatar slot='media' />
  //             </ListItem>
  //             <ListItem
  //               title='This is title'
  //               description='this is description content to demo skeleton'
  //             >
  //               <SkeletonAvatar slot='media' />
  //             </ListItem>
  //             <ListItem
  //               title='This is title'
  //               description='this is description content to demo skeleton'
  //             >
  //               <SkeletonAvatar slot='media' />
  //             </ListItem>
  //             <ListItem
  //               title='This is title'
  //               description='this is description content to demo skeleton'
  //             >
  //               <SkeletonAvatar slot='media' />
  //             </ListItem>
  //             <ListItem
  //               title='This is title'
  //               description='this is description content to demo skeleton'
  //             >
  //               <SkeletonAvatar slot='media' />
  //             </ListItem>
  //           </>
  //         ) : (
  //           <>
  //           {props.userReviewFormList.map((review, index) => (
  //             <ListItem key={index} title={review.userNickName} description={review.comment}>
  //               <Avatar slot='media'>{ getFistTextString(review.userNickName)}</Avatar>
  //             </ListItem>
  //           ))}       
  //           </>
  //         )}
  //       </List>
  //       ) : (
  //         <Box mx='4'>Khách sạn này không có đánh giá</Box>
  //       )}
  // </Card>
  );
}
export default ListReview;
