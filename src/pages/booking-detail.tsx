import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import { Booking } from "../models";




function BookingDetail({ zmproute, zmprouter }) {
  const bookings = useStore('bookings') as Booking[];


  return (
    <h1>booking detail</h1>
  )

}

export default BookingDetail;
