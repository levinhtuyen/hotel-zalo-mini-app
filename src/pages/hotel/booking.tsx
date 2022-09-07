import { Box, Button, Text, Title, useStore, zmp } from "zmp-framework/react";
import { Booking as BookingModel } from "../../models";
import { useContext, useState } from "react";
import DateBooker from "../../components/book/date-booker";
import TableBooker from "../../components/book/table-booker";
import SeatsPicker from "../../components/book/seats-booker";
import TimeBooker from "../../components/book/time-booker";
import Price from "../../components/format/price";
import { pay } from "../../services/zalo";
import store from "../../store";
import { message } from "../../utils/notificaiton";
import HotelContext from "./context";

function Booking() {
  const [seats, setSeats] = useState(4);
  const { hotel } = useContext(HotelContext);
  const [hour, setHour] = useState(hotel.hours.opening);
  const [date, setDate] = useState(new Date());
  const [table, setTable] = useState('05');
  const total = useStore('total') as number;

  const book = async () => {
    await pay(25000 + total);
    await store.dispatch('book', {
      hotel: hotel,
      id: + new Date() + '',
      bookingInfo: {
        seats,
        hour,
        date,
        table
      }
    } as BookingModel)
    message('Đặt bàn thành công');
    zmp.views.main.router.navigate('/calendar/');
  }

  return <>
    <Box mx="4" my="6">
      <DateBooker onChange={setDate} />
      <Box flex justifyContent="space-between" my="6">
        <TableBooker value={table} onChange={setTable} />
        <SeatsPicker value={seats} onChange={setSeats} />
      </Box>
      <TimeBooker hours={hotel.hours} onChange={setHour} />
      <Box height={80}></Box>
    </Box>
  </>;
}

export default Booking;
