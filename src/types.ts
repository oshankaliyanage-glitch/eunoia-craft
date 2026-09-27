export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Woven & Textiles' | 'Ceramics & Tableware' | 'Natural Wellness' | 'Home Decor';
  priceLKR: number;
  image: string;
  description: string;
  materials: string[];
  dimensions: string;
  careInstructions: string;
  badge?: string;
  inStock: boolean;
}

export interface CartItemPersonalization {
  customName?: string;
  customNote?: string;
  giftWrapping?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  personalization?: CartItemPersonalization;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  productInterest: string;
  message: string;
}
