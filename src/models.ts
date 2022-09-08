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
  hotelList: HotelDetail[],
  meta: {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
  }
}
interface IParamsHotel {
  bookingType: string | number
  startTime?: string | undefined
  startDate?: string | undefined
  endDate?: string | undefined
  endTime?: string | undefined
  mode?: number | string | undefined
  hotelSn: number | string
}
export interface HotelDetail
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
  id: number
  name: string
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

export type TabType = 'info' | 'menu' | 'book';
