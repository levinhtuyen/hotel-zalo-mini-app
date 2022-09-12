
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { District, Restaurant, Location, Menu, Food, Cart, Booking, TabType, Hotel, HotelList,IQueryBookingDetail,IParamsHotel } from './models';
import { calcCrowFliesDistance } from './utils/location';
import apiCaller from './utils/apiCaller'
import { getHotelList } from './utils/api/hotel-list'
import { getHotelDetail } from './utils/api/hotel-detail'
import { getApiListRoom } from './utils/api/list-room'
import { getApiBookingDetail } from './utils/api/booking-detail'
import { getApiBookingList } from './utils/api/booking-list'
interface StoreState {
  user: userInfo,
  keyword: string
  position: Location | null
  hotelTab: TabType
  hotels: Hotel[]
  hotelList: any
  districts: District[]
  selectedDistrict: number
  categories: string[]
  foods: Food[]
  cart: Cart
  bookings: Booking[],
  hotelDetail: any,
  listRoom: any,
  bookingDetail: any,
  loadingBookingItem: Boolean,
  loadingBookingDetail: Boolean,
  loadingPopular: Boolean,
  loadingNearest: Boolean,
  loadingQuickFilter: Boolean
}

const store = createStore<StoreState>({
  state: {
    user: {
      id: '4031650262249602963',
      avatar: 'https://avatars.githubusercontent.com/u/42595840?s=96&v=4',
      name: 'Tuyen Le'
    },
    keyword: '',
    position: null,
    districts: [{
      id: 1,
      name: 'Quận 1',
    },{
      id: 2,
      name: 'Quận 2',
    },{
      id: 3,
      name: 'Quận 3',
    },{
      id: 4,
      name: 'Quận 4',
    }, {
      id: 5,
      name: 'Quận 5',
    },
    {
      id: 7,
      name: 'Quận 7',
    }, {
      id: 13,
      name: 'Thủ Đức'
    }],
    selectedDistrict: 0,
    hotelTab: 'info',
    hotels: [
      {
        id: 1,
        name: 'Chi nhánh - Lê Thánh Tôn',
        districtId: 1,
        rating: 4.5,
        location: {
          lat: 10.776463610730223,
          long: 106.70098038648123
        },
        address: '15A Lê Thánh Tôn, Quận 1, Hồ Chí Minh',
        views: 100,
        image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        hours: {
          opening: [9, 0, 'AM'],
          closing: [22, 0, 'PM']
        },
        days: {
          opening: 1,
          closing: 7
        },
        hotline: '0123 456 789',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868527438!2d106.70554879999999!3d10.781038700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f492daac79b%3A0x16e334e4778de0c1!2zMTVhIEzDqiBUaMOhbmggVMO0biwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1655781904560!5m2!1svi!2s'
      },
      {
        id: 2,
        name: 'Chi nhánh - Trần Hưng Đạo',
        address: '15A Trần Hưng Đạo, Đa Kao, Quận 1, Hồ Chí Minh',
        districtId: 1,
        rating: 4.5,
        location: {
          lat: 10.755009040272618,
          long: 106.67897941334107
        },
        views: 50,
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        hours: {
          opening: [9, 0, 'AM'],
          closing: [22, 0, 'PM']
        },
        days: {
          opening: 1,
          closing: 7
        },
        hotline: '0123 456 789',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.585876004013!2d106.69000821538795!3d10.766364992328358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1640b88ca3%3A0x8d9f87825b5b807!2zMTIxLzE1IMSQLiBUcuG6p24gSMawbmcgxJDhuqFvLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655782080310!5m2!1svi!2s'
      }
    ],
    hotelList: {},
    categories: ['Pizza', 'Pasta', 'Salad', 'Sandwich', 'Drink'],
    foods: [{
      id: 1,
      name: 'Daily Pizza',
      price: 400000,
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      categories: ['Pizza', 'Pasta', 'Salad', 'Sandwich', 'Drink'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [{
        key: 'cheese',
        label: 'Thêm phô mai',
        selected: true
      }, {
        key: 'no-onion',
        label: 'Không hành',
        selected: false
      }, {
        key: 'seafood',
        label: 'Thêm hải sản',
        selected: false
      }],
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
          selected: true
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }, {
      id: 2,
      name: 'Prosciutto',
      price: 400000,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      categories: ['Pizza'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [{
        key: 'cheese',
        label: 'Thêm phô mai',
        selected: true
      }, {
        key: 'no-onion',
        label: 'Không hành',
        selected: false
      }, {
        key: 'seafood',
        label: 'Thêm hải sản',
        selected: false
      }],
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
          selected: true
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }, {
      id: 3,
      name: 'Prosciutto',
      price: 400000,
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80',
      categories: ['Pizza', 'Drink'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [{
        key: 'cheese',
        label: 'Thêm phô mai',
        selected: true
      }, {
        key: 'no-onion',
        label: 'Không hành',
        selected: false
      }, {
        key: 'seafood',
        label: 'Thêm hải sản',
        selected: false
      }],
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
          selected: true
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }, {
      id: 4,
      name: 'Daily Pizza',
      price: 400000,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      categories: ['Pizza', 'Drink'],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [{
        key: 'cheese',
        label: 'Thêm phô mai',
        selected: true
      }, {
        key: 'no-onion',
        label: 'Không hành',
        selected: false
      }, {
        key: 'seafood',
        label: 'Thêm hải sản',
        selected: false
      }],
      extras: [{
        key: 'size',
        label: 'Size (Khẩu phần)',
        options: [{
          key: 'small',
          label: 'Nhỏ',
        }, {
          key: 'medium',
          label: 'Vừa',
        }, {
          key: 'large',
          label: 'To',
        }]
      }]
    }],
    cart: {
      items: []
    },
    bookings: [],
    loadingBookingItem: false,
    loadingBookingDetail: false,
    loadingPopular: false,
    loadingNearest: false,
    loadingQuickFilter: false,
    hotelDetail: {},
    listRoom: [],
    bookingDetail: {},
  },
  getters: {
    user({ state }) {
      return state.user
    },
    keyword({ state }) {
      return state.keyword
    },
    hotels({ state }) {
      return state.hotels;
    },
    populars({ state }) {
      return state.hotels
        .filter(hotel => hotel.name.toLowerCase().includes(state.keyword.toLowerCase()))
        .filter(hotel => state.selectedDistrict === 0 || hotel.districtId === state.selectedDistrict)
        .filter(hotel => hotel.views >= 50);
    },
    nearests({ state }) {
      const res = [...state.hotels];
      if (state.position) {
        res.sort((a, b) => {
          const aDistance = calcCrowFliesDistance(state.position!, a.location);
          const bDistance = calcCrowFliesDistance(state.position!, b.location);
          return aDistance - bDistance;
        });
      }
      return res;
    },
    selectedDistrict({ state }) {
      return state.selectedDistrict;
    },
    districts({ state }) {
      return state.districts;
    },
    position({ state }) {
      return state.position;
    },
    foods({ state }) {
      return state.foods;
    },
    menu({ state }): Menu {
      return {
        categories: state.categories.map((category, index) => ({
          id: index,
          name: category,
          foods: state.foods.filter(food => food.categories.includes(category))
        }))
      }
    },
    cart({ state }) {
      return state.cart;
    },
    total({ state }) {
      return state.cart.items.reduce((total, item) => total + item.quantity * item.food.price, 0);
    },
    bookings({ state }) {
      return state.bookings;
    },
    loadingBookingItem({ state }) {
      return state.loadingBookingItem;
    },
    hotelTab({ state }) {
      return state.hotelTab;
    },
    hotelList({ state }) {
      return state.hotelList;
    },
    hotelDetail({ state }) {
      return state.hotelDetail;
    },
    listRoom ({ state }) {
      return state.listRoom;
    },
    bookingDetail({ state }) {
      return state.bookingDetail;
    },
    loadingBookingDetail({ state }) {
      return state.loadingBookingDetail;
    },
    loadingPopular({ state }) {
      return state.loadingPopular;
    },
    loadingNearest({ state }) {
      return state.loadingNearest;
    },
    loadingQuickFilter({ state }) {
      return state.loadingQuickFilter;
    },
  },
  actions: {
    setUser({ state }, data: userInfo)
    {
      state.user = { ...state.user, ...data }
    },
    setPosition({ state }, data: Location) {
      state.position = data;
    },
    setKeyword({ state }, keyword: string) {
      state.keyword = keyword;
    },
    changeDistrict({ state }, districtId: number) {
      state.selectedDistrict = districtId;
    },
    addToCart({ state }, { cartItemIndex, ...item }: { food: Food, quantity: number, note: string, cartItemIndex?: number }) {
      if (cartItemIndex) {
        state.cart.items[cartItemIndex] = item;
      } else {
        state.cart.items.push(item);
      }
      state.cart = { ...state.cart };
    },
    book({ state }, booking: Booking) {
      if (!booking.cart) {
        booking.cart = state.cart;
      }
      state.bookings = [...state.bookings, booking];
    },
    unbook({ state }, bookingId: string) {
      
    },
    changeHotelTab({ state }, tab: TabType) {
      state.hotelTab = tab;
    },
    async setHotelList({ state }, dataHotelList: HotelList)
    {
      const { data } = await getHotelList()
      state.hotelList = data.data.hotelList
    },
    async getHotelDetail ({ state }, query: IParamsHotel)
    {
      const { data } = await getHotelDetail(query)
      state.hotelDetail = data.data
    },
    async getListRoom ({ state }, query: IParamsHotel)
    {
      const { data } = await getApiListRoom(query)
      state.listRoom = data.data
    },
    async setBooking({ state })
    {
      state.loadingBookingItem = true
      const { data } = await getApiBookingList()
      state.bookings = data.data.bookingList
      state.loadingBookingItem = false
    },
    async getBookingDetail({ state }, query: IQueryBookingDetail)
    {
      state.loadingBookingDetail = true
      const { data } = await getApiBookingDetail(query)
      state.bookingDetail = data.data
      state.loadingBookingDetail = false
    },
  },
})

export default store;
