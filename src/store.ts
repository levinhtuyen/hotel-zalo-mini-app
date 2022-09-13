
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { District, IQueryHotelListHome, Location, Menu, Food, Cart, Booking, TabType, Hotel, HotelList,IQueryBookingDetail,IParamsHotel } from './models';
import { calcCrowFliesDistance } from './utils/location';
import { getHotelList } from './utils/api/hotel-list'
import { getHotelDetail } from './utils/api/hotel-detail'
import { getApiListRoom } from './utils/api/list-room'
import { getApiBookingDetail } from './utils/api/booking-detail'
import { getApiBookingList } from './utils/api/booking-list'
import { getApiHotelNearest } from './utils/api/hotel-nearest'
import { getApiHotelPopular } from './utils/api/hotel-popular'
import { getApiQuickFilter } from './utils/api/hotel-quick-filter'
import { getApiHotelSearchKeyword } from './utils/api/hotel-search-keyword'

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
  hotelPopular: any;
  hotelNearest: any;
  hotelQuickFilter: any;
  listRoom: any,
  bookingDetail: any,
  loadingBookingItem: Boolean,
  loadingBookingDetail: Boolean,
  loadingPopular: Boolean,
  loadingNearest: Boolean,
  loadingQuickFilter: Boolean
  loadingHotelDetail: Boolean,
  loadingListRoom: Boolean,
  loadingSearchKeyword: Boolean,
  hotelSearch: any
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
    districts: [
    {
        code: "BCH",
        idx: 20,
        iosTotalAccess: 33846,
        lastUpdate: "2022-09-06 16:33:38",
        name: "Bình Chánh",
        nameCode: "Bình Chánh,Binh Chanh,",
        provinceSn: 1,
        sn: 22,
        status: 1,
        totalContracted: 58,
        totalHotel: 120
    },
    {
        code: "BTA",
        idx: 13,
        iosTotalAccess: 18676,
        lastUpdate: "2022-08-31 00:01:35",
        name: "Bình Tân",
        nameCode: "Bình Tân,Binh Tan,",
        provinceSn: 1,
        sn: 18,
        status: 1,
        totalContracted: 33,
        totalHotel: 52
    },
    {
        code: "BTH",
        idx: 14,
        iosTotalAccess: 32249,
        lastUpdate: "2022-08-24 00:01:36",
        name: "Bình Thạnh",
        nameCode: "Bình Thạnh,Binh Thanh,",
        provinceSn: 1,
        sn: 7,
        status: 1,
        totalContracted: 48,
        totalHotel: 103
    },
    {
        code: "CGI",
        idx: 21,
        iosTotalAccess: 2735,
        lastUpdate: "2022-07-08 17:02:11",
        name: "Cần Giờ",
        nameCode: "Cần Giờ,Can Gio,",
        provinceSn: 1,
        sn: 24,
        status: 1,
        totalContracted: 2,
        totalHotel: 3
    },
    {
        code: "CCH",
        idx: 22,
        iosTotalAccess: 9555,
        lastUpdate: "2022-07-08 17:02:11",
        name: "Củ Chi",
        nameCode: "Củ Chi,Cu Chi,",
        provinceSn: 1,
        sn: 20,
        status: 1,
        totalContracted: 2,
        totalHotel: 6
    },
    {
        code: "GVA",
        idx: 15,
        iosTotalAccess: 17823,
        lastUpdate: "2022-08-23 00:01:39",
        name: "Gò Vấp",
        nameCode: "Gò Vấp,Go Vap,",
        provinceSn: 1,
        sn: 6,
        status: 1,
        totalContracted: 70,
        totalHotel: 106
    },
    {
        code: "HMO",
        idx: 23,
        iosTotalAccess: 42999,
        lastUpdate: "2022-07-08 17:02:12",
        name: "Hóc Môn",
        nameCode: "Hóc Môn,Hoc Mon,",
        provinceSn: 1,
        sn: 21,
        status: 1,
        totalContracted: 1,
        totalHotel: 1
    },
    {
        code: "NBE",
        idx: 24,
        iosTotalAccess: 6712,
        lastUpdate: "2022-07-08 17:02:12",
        name: "Nhà Bè",
        nameCode: "Nhà Bè,Nha Be,",
        provinceSn: 1,
        sn: 23,
        status: 1,
        totalContracted: 2,
        totalHotel: 2
    },
    {
        code: "PNH",
        idx: 16,
        iosTotalAccess: 18997,
        lastUpdate: "2022-08-12 09:10:04",
        name: "Phú Nhuận",
        nameCode: "Phú Nhuận,Phu Nhuan,",
        provinceSn: 1,
        sn: 9,
        status: 1,
        totalContracted: 52,
        totalHotel: 127
    },
    {
        code: "001",
        idx: 1,
        iosTotalAccess: 1658657,
        lastUpdate: "2022-08-26 00:01:38",
        name: "Quận 1",
        nameCode: "Quận 1,District 1,Quan 1,",
        provinceSn: 1,
        sn: 2,
        status: 1,
        totalContracted: 290,
        totalHotel: 788
    },
    {
        code: "010",
        idx: 10,
        iosTotalAccess: 26256,
        lastUpdate: "2022-08-30 00:01:44",
        name: "Quận 10",
        nameCode: "Quận 10,District 10,Quan 10,",
        provinceSn: 1,
        sn: 12,
        status: 1,
        totalContracted: 58,
        totalHotel: 123
    },
    {
        code: "011",
        idx: 11,
        iosTotalAccess: 15493,
        lastUpdate: "2022-07-08 17:02:14",
        name: "Quận 11",
        nameCode: "Quận 11,District 11,Quan 11,",
        provinceSn: 1,
        sn: 13,
        status: 1,
        totalContracted: 12,
        totalHotel: 16
    },
    {
        code: "012",
        idx: 12,
        iosTotalAccess: 7658,
        lastUpdate: "2022-07-08 17:02:14",
        name: "Quận 12",
        nameCode: "Quận 12,District 12,Quan 12,",
        provinceSn: 1,
        sn: 3,
        status: 1,
        totalContracted: 20,
        totalHotel: 34
    },
    {
        code: "002",
        idx: 2,
        iosTotalAccess: 11088,
        lastUpdate: "2022-07-08 17:02:15",
        name: "Quận 2",
        nameCode: "Quận 2,District 2,Quan 2,",
        provinceSn: 1,
        sn: 10,
        status: 1,
        totalContracted: 39,
        totalHotel: 81
    },
    {
        code: "003",
        idx: 3,
        iosTotalAccess: 23457,
        lastUpdate: "2022-08-27 00:01:49",
        name: "Quận 3",
        nameCode: "Quận 3,District 3,Quan 3,",
        provinceSn: 1,
        sn: 11,
        status: 1,
        totalContracted: 344,
        totalHotel: 506
    },
    {
        code: "004",
        idx: 4,
        iosTotalAccess: 10137,
        lastUpdate: "2022-07-08 17:02:16",
        name: "Quận 4",
        nameCode: "Quận 4,District 4,Quan 4,",
        provinceSn: 1,
        sn: 14,
        status: 1,
        totalContracted: 14,
        totalHotel: 39
    },
    {
        code: "005",
        idx: 5,
        iosTotalAccess: 31865,
        lastUpdate: "2022-09-12 10:00:13",
        name: "Quận 5",
        nameCode: "Quận 5,District 5,Quan 5,",
        provinceSn: 1,
        sn: 15,
        status: 1,
        totalContracted: 42,
        totalHotel: 101
    },
    {
        code: "006",
        idx: 6,
        iosTotalAccess: 12086,
        lastUpdate: "2022-07-08 17:02:17",
        name: "Quận 6",
        nameCode: "Quận 6,District 6,Quan 6,",
        provinceSn: 1,
        sn: 16,
        status: 1,
        totalContracted: 8,
        totalHotel: 13
    },
    {
        code: "007",
        idx: 7,
        iosTotalAccess: 26418,
        lastUpdate: "2022-09-10 00:01:32",
        name: "Quận 7",
        nameCode: "Quận 7,District 7,Quan 7,",
        provinceSn: 1,
        sn: 19,
        status: 1,
        totalContracted: 71,
        totalHotel: 183
    },
    {
        code: "008",
        idx: 8,
        iosTotalAccess: 17340,
        lastUpdate: "2022-07-08 17:02:19",
        name: "Quận 8",
        nameCode: "Quận 8,District 8,Quan 8,",
        provinceSn: 1,
        sn: 17,
        status: 1,
        totalContracted: 5,
        totalHotel: 24
    },
    {
        code: "009",
        idx: 9,
        iosTotalAccess: 5542,
        lastUpdate: "2022-07-08 17:02:19",
        name: "Quận 9",
        nameCode: "Quận 9,District 9,Quan 9,",
        provinceSn: 1,
        sn: 5,
        status: 1,
        totalContracted: 15,
        totalHotel: 20
    },
    {
        code: "TBI",
        idx: 17,
        iosTotalAccess: 2071842,
        lastUpdate: "2022-09-12 10:03:16",
        name: "Tân Bình",
        nameCode: "Tân Bình,Tan Binh,",
        provinceSn: 1,
        sn: 1,
        status: 1,
        totalContracted: 131,
        totalHotel: 308
    },
    {
        code: "TPH",
        idx: 18,
        iosTotalAccess: 16535,
        lastUpdate: "2022-08-22 09:32:38",
        name: "Tân Phú",
        nameCode: "Tân Phú,Tan Phu,",
        provinceSn: 1,
        sn: 8,
        status: 1,
        totalContracted: 27,
        totalHotel: 42
    },
    {
        code: "TDU",
        idx: 19,
        iosTotalAccess: 10331,
        lastUpdate: "2022-07-14 00:00:04",
        name: "Thủ Đức",
        nameCode: "Thủ Đức,Thu Duc,",
        provinceSn: 1,
        sn: 4,
        status: 1,
        totalContracted: 14,
        totalHotel: 30
    }
    ],
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
    loadingHotelDetail: false,
    loadingListRoom: false,
    loadingSearchKeyword: false,
    hotelDetail: {},
    listRoom: [],
    bookingDetail: {},
    hotelPopular: [],
    hotelNearest: [],
    hotelQuickFilter: [],
    hotelSearch: []
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
    hotelPopular({ state }) {
      return state.hotelPopular;
    },
    hotelNearest({ state }) {
      return state.hotelNearest;
    },
    hotelQuickFilter({ state }) {
      return state.hotelQuickFilter;
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
  },
  actions: {
    setUser({ state }, data: userInfo)
    {
      state.user = { ...state.user, ...data }
    },
    setPosition({ state }, data: Location) {
      state.position = data;
    },
    setKeyword({ state }, keyword: string)
    {
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
    async getHotelPopular({ state }, query: IQueryHotelListHome) {
      state.loadingPopular = true
      const { data } = await getApiHotelPopular(query)
      state.hotelPopular = data.data.hotelList
      state.loadingPopular = false
    },
    async getHotelNearest({ state }, query: IQueryHotelListHome)
    {
      state.loadingNearest = true
      const { data } = await getApiHotelNearest(query)
      state.hotelNearest = data.data.hotelList
      state.loadingNearest = false
      
    },
    async getHotelQuickFilter({ state }, query: IQueryHotelListHome) {
      state.loadingQuickFilter = true
      const { data } = await getApiQuickFilter(query)
      state.hotelQuickFilter = data.data.hotelList
      state.loadingQuickFilter = false
    },
    async getHotelSearchKeyword ({ state }) {
      
      state.loadingSearchKeyword = true
      const { data } = await getApiHotelSearchKeyword({keyword : state.keyword})
      state.hotelSearch = data.data
      state.loadingSearchKeyword = false
    },
  },
})

export default store;
