import { useState } from 'react';
import {
  Text,
  Sheet,
  Card,
  Box,
  useStore,
  Button,
} from 'zmp-framework/react';
import store from '../store';
import { FaHotel,FaCcMastercard,FaCheck } from 'react-icons/fa';

function SheetPaymentMethod({zmprouter}) {
  const paymentMethod = useStore('paymentMethod');
  const [paymentState, setPaymentState] = useState(paymentMethod)
  const choosePayment = (payment) => {
    store.dispatch("setPaymentMethod", payment)
    setPaymentState(payment)
    console.log('payment :>> ', payment);
  }
  const onClickToEndPaymentMethod = () => {
    store.dispatch("setPaymentMethod", paymentState)
    zmprouter.back();
  }
  return (
    <Sheet
      backdrop
      closeButton
      title="Chọn phương thức thanh toán"
      className='h-2/4 bottom-0'
    >
        <div className='overflow-hidden '>
        
          <div className=' overflow-scroll ' >
            <Card >
              <div className='px-4'>
                <div onClick={()=> choosePayment(1)} className={paymentState === 1 ? 'w-full  flex items-left  justify-between bg-orange-200 align-middle p-2' :'w-full  flex items-left  justify-between align-middle p-2'}>
                  <div className='flex'>
                    <FaHotel className="z-10" fontSize={18}/>
                    <Text className={paymentState === 1 ? 'pl-3 text-[#ff6400] items-center mb-0' :'pl-3 h-full mb-0'}>Thanh toán tại khách sạn</Text>
                  </div>
                  <div className={paymentState === 1 ? 'block pr-4 text-[#ff6400]' : 'hidden'}>
                    <FaCheck fontSize={18}/>
                  </div>
                </div>
                <Box className='w-full text-[10px] text-[#ff6400]'>Lưu ý! Khách sạn có thể hủy phòng tùy theo trạng thái phòng</Box>
                <Box className='w-full text-[12px] font-semibold text-[#000]'>Thanh toán ngay để giữ phòng</Box>
                <div onClick={()=> choosePayment(2)} className={paymentState === 2 ? 'w-full  flex items-left  justify-between bg-orange-200 align-middle p-2' :'w-full  flex items-left  justify-between align-middle p-2'}>
                  <div className='flex'>
                    <FaCcMastercard className="z-10" fontSize={18}/>
                    <Text className={paymentState === 2 ? 'pl-3 text-[#ff6400] items-center mb-0' :'pl-3 h-full mb-0'}>ATM Card</Text>
                  </div>
                  <div className={paymentState === 2 ? 'block pr-4 text-[#ff6400]' : 'hidden'}>
                    <FaCheck fontSize={18}/>
                  </div>
                </div>
                <div onClick={()=> choosePayment(3)} className={paymentState === 3 ? 'w-full  flex items-left  justify-between bg-orange-200 align-middle p-2' :'w-full  flex items-left  justify-between align-middle p-2'}>
                  <div className='flex'>
                    <FaCcMastercard className="z-10" fontSize={18}/>
                    <Text className={paymentState === 3 ? 'pl-3 text-[#ff6400] items-center mb-0' :'pl-3 h-full mb-0'}>Credit Card</Text>
                  </div>
                  <div className={paymentState === 3 ? 'block pr-4 text-[#ff6400]' : 'hidden'}>
                    <FaCheck fontSize={18}/>
                  </div>
                </div>
                <div onClick={()=> choosePayment(4)} className={paymentState === 4 ? 'w-full  flex items-left  justify-between bg-orange-200 align-middle p-2' :'w-full  flex items-left  justify-between align-middle p-2'}>
                  <div className='flex'>
                    <img className='w-5 h-5' src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                    <Text className={paymentState === 4 ? 'pl-3 text-[#ff6400] items-center mb-0' :'pl-3 h-full mb-0'}>Ví MoMo</Text>
                  </div>
                  <div className={paymentState === 4 ? 'block pr-4 text-[#ff6400]' : 'hidden'}>
                    <FaCheck fontSize={18}/>
                  </div>
                </div>
                <div onClick={()=> choosePayment(5)} className={paymentState === 5 ? 'w-full  flex items-left  justify-between bg-orange-200 align-middle p-2' :'w-full  flex items-left  justify-between align-middle p-2'}>
                  <div className='flex align-middle items-center'>
                    <img className='w-5 h-5' src="https://thuthuatmaytinh.vn/wp-content/uploads/2019/02/ZaloPay-logo.png" alt="" />
                    <Text className={paymentState === 5 ? 'pl-3 text-[#ff6400] items-center mb-0' :'pl-3 h-full mb-0'}>Ví ZaloPay</Text>
                  </div>
                  <div className={paymentState === 5 ? 'block pr-4 text-[#ff6400]' : 'hidden'}>
                    <FaCheck fontSize={18}/>
                  </div>
                  
                </div>
              </div>
              <Box px="6" py='2' className='w-full flex justify-center h-12 fixed bottom-0'>
              <Button
                typeName='primary'
                onClick={()=> onClickToEndPaymentMethod()}
                className='w-72'
              >
                Xác nhận
              </Button>
            </Box>
            </Card>
            
          </div>
        </div>
    </Sheet>
  );
}

export default SheetPaymentMethod;
