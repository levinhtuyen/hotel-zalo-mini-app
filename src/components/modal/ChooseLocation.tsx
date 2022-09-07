import React, { useState, useRef } from "react";
import { Sheet, Button, Box, Text, Title, zmp } from 'zmp-framework/react';

const ChooseLocation = (props) => {
  const sheet = useRef<any>();
  const viewHotelList = () => {
    zmp.views.main.router.navigate({
      path: '/hotel-list',
    });
  };
  const setOpenedModal = (e) =>
  {
    props.handleChange(e);
  };
  return (
    <Sheet
      ref={sheet}
      swipeToClose
      opened={props.customSheetOpened}
      backdrop
      onSheetClose={(e) => setOpenedModal(e)}
      closeButton
      title='Chọn vị trí'
      className='demo-custom-sheet'
    >
      <Box p='4'>
        <Text size='small'>
          Auxiliary description content can be arranged according to actual
          needs
        </Text>
        <Box mx='10'>
          <Button typeName='primary' responsive onClick={viewHotelList}>
            Chọn
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};
export default ChooseLocation;
