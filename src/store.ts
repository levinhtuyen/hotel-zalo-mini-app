
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { District, Restaurant, Location, Menu, Food, Cart, Booking, TabType, IParamsHotel, IQueryBookingDetail } from './models';
import { calcCrowFliesDistance } from './utils/location';
import { getHotelDetail } from './utils/api/hotel-detail'
import { getApiBookingDetail } from './utils/api/booking-detail'
import { getApiHotelNearest } from './utils/api/hotel-nearest'
import { getApiHotelPopular } from './utils/api/hotel-popular'
import { getApiQuickFilter } from './utils/api/hotel-quick-filter'
import { getApiHotelSearchKeyword } from './utils/api/hotel-search-keyword'
import { getApiBookingList } from './utils/api/booking-list'
import { getApiListRoom } from './utils/api/list-room'
import { getHotelList } from './utils/api/hotel-list'

interface StoreState {
  user: userInfo,
  keyword: string
  position: Location | null
  hotelTab: TabType
  restaurants: Restaurant[]
  districts: District[]
  selectedDistrict: number
  categories: string[]
  foods: Food[]
  cart: Cart

  hotelList: any

  loadingBookingDetail: Boolean
  bookingDetail: any,

  loadingBookingItem: Boolean,
  bookings: Booking[]

  hotelDetail: any
  loadingHotelDetail: Boolean
  
  loadingQuickFilter: Boolean
  hotelQuickFilter: any

  listRoom: any,
  loadingListRoom: Boolean,

  loadingSearchKeyword: Boolean,
  hotelSearch: any,

  hotelPopular: any;
  loadingPopular: Boolean,

  loadingNearest: Boolean,
  hotelNearest: any;
}

const store = createStore<StoreState>({
  state: {
    user: {
      id: '',
      avatar: '',
      name: ''
    },
    keyword: '',
    position: null,
    districts: [{
      id: 1,
      name: 'Quận 1',
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
    selectedDistrict: 1,
    hotelTab: 'info',
    restaurants: [
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
    hotelDetail: {},
    loadingHotelDetail: false,
    loadingBookingDetail: false,
    loadingBookingItem: false,
    loadingPopular: false,
    loadingNearest: false,
    loadingQuickFilter: false,
    loadingListRoom: false,
    loadingSearchKeyword: false,
    bookingDetail: {},
    listRoom: [],
    hotelPopular: [],
    hotelNearest: [],
    hotelQuickFilter: [],
    hotelSearch: [],
    hotelList: {},
  },
  getters: {
    user({ state }) {
      return state.user
    },
    keyword({ state }) {
      return state.keyword
    },
    restaurants({ state }) {
      return state.restaurants;
    },
    populars({ state }) {
      return state.restaurants
        .filter(restaurant => restaurant.name.toLowerCase().includes(state.keyword.toLowerCase()))
        .filter(restaurant => state.selectedDistrict === 0 || restaurant.districtId === state.selectedDistrict)
        .filter(restaurant => restaurant.views >= 50);
    },
    nearests({ state }) {
      const res = [...state.restaurants];
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
    hotelTab({ state }) {
      return state.hotelTab;
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
    loadingHotelDetail({ state }) {
      return state.loadingHotelDetail;
    },
    loadingListRoom({ state }) {
      return state.loadingListRoom;
    },
    loadingSearchKeyword({ state }) {
      return state.loadingSearchKeyword;
    },
    hotelSearch({ state }) {
      return state.hotelSearch;
    },
    hotelList({ state }) {
      return state.hotelList;
    },
    hotelPopular({ state }) {
      return state.hotelPopular;
    },
    hotelNearest({ state }) {
      return state.hotelNearest;
    },
    hotelQuickFilter({ state }) {
      return state.hotelQuickFilter;
    },
    loadingBookingItem({ state }) {
      return state.loadingBookingItem;
    },
  },
  actions: {
    setUser({ state }, data: userInfo) {
      state.user = { ...state.user, ...data }
      // mock booking
      
    },
    setPosition({ state }, data: Location) {
      state.position = data;
    },
    setKeyword({ state }, keyword: string) {
      state.keyword = keyword;
    },
    async setHotelList({ state }, dataHotelList: any)
    {
      const { data } = await getHotelList()
      state.hotelList = data.data.hotelList
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
      state.bookings = state.bookings.filter(b => b.id !== bookingId);
    },
    changehotelTab({ state }, tab: TabType) {
      state.hotelTab = tab;
    },
    async getHotelDetail ({ state }, query: IParamsHotel)
    {
      state.loadingHotelDetail = true
      const { data } = await getHotelDetail(query)
      state.hotelDetail = data.data
      state.loadingHotelDetail = false
    },
    async getListRoom ({ state }, query: IParamsHotel)
    {
      state.loadingListRoom = true
      const { data } = await getApiListRoom(query)
      state.listRoom = data.data
      state.loadingListRoom = false
    },
    async getBookingDetail({ state }, query: IQueryBookingDetail)
    {
      state.loadingBookingDetail = true
      const { data } = await getApiBookingDetail(query)
      state.bookingDetail = data.data
      state.loadingBookingDetail = false
    },
    async getHotelSearchKeyword ({ state }) {
      
      state.loadingSearchKeyword = true
      const { data } = await getApiHotelSearchKeyword({keyword : state.keyword})
      state.hotelSearch = data.data
      state.loadingSearchKeyword = false
    },
    async getHotelNearest({ state }, query: any)
    {
      state.loadingNearest = true
      const { data } = await getApiHotelNearest(query)
      state.hotelNearest = data.data.hotelList
      state.loadingNearest = false
      
    },
    async getHotelQuickFilter({ state }, query: any) {
      state.loadingQuickFilter = true
      const { data } = await getApiQuickFilter(query)
      state.hotelQuickFilter = data.data.hotelList
      state.loadingQuickFilter = false
    },
    async getHotelPopular({ state }, query: any) {
      state.loadingPopular = true
      const { data } = await getApiHotelPopular(query)
      state.hotelPopular = data.data.hotelList
      state.loadingPopular = false
    },
    async getBookingsList ({ state }) {
      state.loadingBookingItem = true
      const { data } = await getApiBookingList()
      state.bookings = data.data.bookingList
      state.loadingBookingItem = false
    },
  },
  
})

export default store;
