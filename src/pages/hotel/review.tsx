import {
  Box,
  Card,
  Preloader,
  Title,
  useStore,
  zmp,
} from 'zmp-framework/react';

import { useContext, useState, useEffect } from 'react';
import HotelContext from "./context";

function Review() {
  const { hotelDetail } = useContext(HotelContext);
  const reviews = hotelDetail?.userReviewFormList;
  const logo = 'https://go2joy.vn/images/logo-mini.png';
  const [toastLoading, setToastLoading] = useState(true);
  setTimeout(() => {
    setToastLoading(false);
  }, 500);
  return (
    <>
      {reviews?.length ? (
        <Box mx='4' mt='5'>
          <Title size='small'>Gần bạn nhất</Title>
          {toastLoading ? (
            <Box mx='4' mt='5'>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Preloader logo={logo} />
              </div>
            </Box>
          ) : (
            <>
              {reviews?.map((review) => (
                <Box key={review.sn} mx='4' mb='4' mt='5'>
                  <Card title={review.userNickName} inset>
                    <Box mx='4' my='6'>
                      {review.hotelName}
                    </Box>
                    <Title size='small'> {review.comment}</Title>
                  </Card>
                </Box>
              ))}
            </>
          )}
        </Box>
      ) : (
        <Box mx='4'>Không có review nào</Box>
      )}
    </>
  );
}

export default Review;
