import { useEffect } from 'react';
import { App, View } from 'zmp-framework/react';
import api from 'zmp-sdk';
import Header from './header';
import NavigationBar from './navigation-bar';
import store from '../store';
import FoodPicker from '../pages/food-picker';
import Cart from './cart';
import floating from '@utils/floating';
import BookingDetail from '../pages/booking-detail';
import SheetPromotionDetail from '../pages/sheet-promotion-detail';
import SheetPaymentMethod from '../pages/choose-payment-method'
import { useSheetStatusBar } from '../hooks';
import ErrorBoundary from './error-boundary';
import { getUser, requestLocation } from '../services/zalo';
import appConfig from '../../app-config.json';

const MyApp = () => {
  const zmpparams = {
    name: appConfig.app.title,
    theme: 'auto',
    store: store,
  };

  const init = async () => {
    await api.login();
    floating()
    getUser();
    requestLocation();
  }

  useEffect(() => {
    init();
  }, [])

  useSheetStatusBar();

  return (
    <ErrorBoundary>
      <App {...zmpparams}>
        <Header />
        <div className='main-wrapper' id='main-wrapper'>
            <div id='floating-snap-btn-wrapper'>
              <div className='fab-btn'>
                <p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        <View
          main
          url="/"
          routesAdd={[
            {
              path: '/food-picker/',
              sheet: {
                component: FoodPicker,
              }
            }, {
              path: '/booking-detail/',
              sheet: {
                component: BookingDetail,
              }
            },
            {
              path: '/sheet-promotion-detail/',
              sheet: {
                component: SheetPromotionDetail,
              }
            },
            {
              path: '/choose-payment-method/',
              sheet: {
                component: SheetPaymentMethod,
              }
            }
          ]}
        />
        <NavigationBar />
        <Cart />
      </App>
    </ErrorBoundary>
  );
}
export default MyApp;
