import { useEffect } from 'react';
import {
  Text,
  Sheet,
  Card,
  Title,
  useStore,
} from 'zmp-framework/react';
import store from '../store';

function SheetPaymentMethod() {
  const paymentMethod = useStore('paymentMethod');
  console.log('paymentMethod :>> ', paymentMethod);
  return (
    <Sheet
      backdrop
      className=''
      closeButton
      title="Chọn phương thức thanh toán"
    >
        <div className='overflow-hidden'>
        
          <div className=' overflow-scroll h-[650px]' >
            <Card >
              <div className='flex items-center justify-center px-4'>
                <Text>123232</Text>
              </div>
            </Card>
          </div>
        </div>
    </Sheet>
  );
}

export default SheetPaymentMethod;
