
export enum UserRole {
  Buyer = 'Buyer',
  Seller = 'Seller',
  Admin = 'Admin',
}

export enum PropertyType {
  House = 'House',
  Apartment = 'Apartment',
  Land = 'Land',
  Commercial = 'Commercial Space',
}

export enum PropertyStatus {
  ForSale = 'For Sale',
  ForRent = 'For Rent',
}

export enum SehoreLocality {
  Ichhawar = 'Ichhawar',
  Ashta = 'Ashta',
  Nasrullaganj = 'Nasrullaganj',
  Budhni = 'Budhni',
  Rehti = 'Rehti',
  Shyampur = 'Shyampur',
  SehoreTown = 'Sehore Town',
  Mandi = 'Mandi',
}

export interface Property {
  id: string;
  type: PropertyType;
  status: PropertyStatus;
  locality: SehoreLocality;
  address: string;
  description: string;
  images: string[]; // URLs or base64 strings
  basePrice?: number;
  commission?: number; // Can be a percentage or a flat amount
  finalPrice?: number;
  listedDate: string;
}

export interface PriceRequest {
  id: string;
  propertyId: string;
  buyerName: string;
  buyerEmail: string;
  requestDate: string;
  status: 'Pending' | 'Responded';
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
