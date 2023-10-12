export interface Address {
  countryCode: string;
}
export interface Distance {
  value: number;
  unit: string;
}
export interface GeoCode {
  latitude: number;
  longitude: number;
}
export interface Hotel {
  name: string;
  lastUpdate: string;
  iataCode: string;
  hotelId: string;
  giataId: number;
  dupeId: number;
  chainCode: string;
  address: Address;
  distance: Distance;
  geoCode: GeoCode;
}

export interface Meta {
  count: number;
  links: {
    self: string;
  };
}

export interface ApiResponse {
  data: Array<Hotel>;
  meta: Meta;
}
