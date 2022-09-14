export interface Restaurant {
  id: number
  name: string
  districtId: number
  location: Location
  views: number
  image: string
  address: string
  hours: {
    opening: Hours,
    closing: Hours,
  },
  days: {
    opening: number
    closing: number
  },
  hotline: string
  map: string
  rating: number
}
export interface HotelList
{
  length: any
  additionalData?: {
    hotelCollectionName: string
    hotelCollectionSn: number
    latitudeMax: string
    latitudeMin: string
    longitudeMax: string
    longitudeMin: string
  },
  hotelList: HotelListDetail[],
  meta: {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
  }
}
export interface IParamsHotel {
  bookingType: string | number
  hotelSn: number | string
}
export interface IQueryBookingDetail
{
  userBookingSn: number | string
}
export interface IQueryHotelListHome
{
  minPrice?: number,
  maxPrice?: number,
  page?: number,
  limit?: number,
  sort?: number,
  checkInDatePlan?: string,
  endDate?: string,
  longitude?: number,
  latitude?: number,
  bookingType?: number,
  startTime?: string,
  endTime?: string,
}
interface IParamsRoom {
  hotelSn: number | string
  bookingType: string | number
  startTime?: string
  startDate?: string
  endDate?: string
  endTime?: string
  mode?: number | string
}
export type HeaderType = {
  route?: string;
};
export interface HotelListDetail
{
  averageMark: number
  bookingType: number
  discountPrice: number
  districtName: string
  facilityList: []
  firstHours: number
  hotelImage: string
  isDirectDiscount: false
  isExtraFee: false
  isFavorite: false
  isFlashSale: false
  latitude: number
  longitude: number
  name: string
  originPrice: number
  percentDirectDiscount: number
  provinceName: string
  sn: number
  totalReview: number
}
export interface Hotel
{
  id: number
  name: string
  districtId: number
  location: Location
  views: number
  image: string
  address: string
  hours: {
    opening: Hours,
    closing: Hours,
  },
  days: {
    opening: number
    closing: number
  },
  hotline: string
  map: string
  rating: number
}
export interface Article {
  id: string
  hotel: Hotel
  cart?: Cart
  bookingInfo?: {
    date: Date
    hour: Hours
    table: string
    seats: number
  }
}

export interface District {
  code: string | number
  idx?: number,
  iosTotalAccess?: number,
  lastUpdate?: string
  name?: string
  nameCode?: string
  provinceSn?: number,
  sn?: number,
  status?: number,
  totalContracted?: number,
  totalHotel?: number,
}

export interface Location {
  lat: number,
  long: number
}

export interface Menu {
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  foods: Food[]
}

export interface Food {
  id: number
  name: string
  price: number
  description: string
  image: string
  categories: string[]
  extras: Extra[]
  options: Option[]
}

export interface Option {
  key: string
  label: string
  selected: boolean
}

export interface Extra {
  key: string
  label: string
  options: {
    key: string
    label: string
    selected?: boolean
  }[]
}

export interface Cart {
  items: CartItem[]
}

export interface CartItem {
  quantity: number
  food: Food
  note: string
}

export type Hours = [number, number, 'AM' | 'PM'];

export interface Booking {
  id: string
  hotel: Hotel
  cart?: Cart
  bookingInfo?: {
    date: Date
    hour: Hours
    table: string
    seats: number
  }
}

export type TabType = 'info' | 'room' | 'review';
