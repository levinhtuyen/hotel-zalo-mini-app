
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
export interface IParamsHotel {
  bookingType: string | number
  hotelSn: number | string
}
export interface IQueryBookingDetail
{
  userBookingSn: number | string
}
export interface Province {
  code: string | number,
  areaCode?:string,
  idx?: number,
  iosTotalAccess?: number,
  lastUpdate?: string
  countrySn?: number,
  name?: string
  nameCode?: string
  provinceSn?: number,
  sn?: number,
  status?: number,
  totalContracted?: number,
  totalHotel?: number,
  longitude?: string | number,
  latitude?: string | number,
  androidTotalAccess?: string| number,
  banner?: string | number,
  regions?: string | number,
  popup?: string | number,
}
export interface District {
  androidTotalAccess?: string | number,
  code?: string | number,
  idx?: string | number,
  iosTotalAccess?: string | number,
  lastUpdate?: string | number,
  name?: string | number,
  nameCode?: string | number,
  provinceSn?: string | number,
  sn?: string | number,
  status?: string | number,
  totalContracted?: string | number,
  totalHotel?: string | number,
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
  restaurant: Restaurant
  cart?: Cart
  bookingInfo?: {
    date: Date
    hour: Hours
    table: string
    seats: number
  }
}

export type TabType = 'info' | 'menu' | 'book';
