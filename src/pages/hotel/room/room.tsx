import { FunctionComponent } from "react";
import { Avatar, Button, Text, Title, zmp } from "zmp-framework/react";
// import { Food } from "../../../models";
import Price from "../../../components/format/price";
import getImgUrl from '../../../utils/img-url';

interface FoodItemProps {
  room: any
}

const FoodItem: FunctionComponent<FoodItemProps> = ({ room }) => {
  const pick = () => {
    zmp.views.main.router.navigate({
      path: '/food-picker/',
      query: {
        id: room.sn
      }
    })
  }
  return (
    <div
      onClick={pick}
      className='p-6 bg-white text-center'
      style={{ borderRadius: 10 }}
    >
      <Avatar size={96} src={getImgUrl(room.imagePath)} />
      <Title size='small'>{room.name}</Title>
      <Text size='xlarge' className='text-secondary' bold>
        <Price amount={room.firstHoursOrigin} />
      </Text>
      <Button
        fill
        responsive
        large
        className='rounded-xl'
      >Room detail</Button>
    </div>
  );
}

export default FoodItem;
