export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Birthday' | 'Anniversary' | 'Wedding' | 'Cupcakes' | 'Pastries' | 'Accessories' | 'Combos';
  imageUrl: string;
  characteristics: string[];
  inStock: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  cakeName: string;
  cakeDesign: string;
  price: number;
  imageUrl?: string;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryMethod?: 'delivery' | 'pickup';
}

export interface TimelineEvent {
  status: OrderStatus;
  timestamp: string;
  message: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'picked' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  readableId: string;
  userId: string;
  items: OrderItem[];
  deliveryDetails: DeliveryDetails;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: 'unpaid' | 'paid';
  paymentMethod: 'esewa' | 'khalti' | 'cod';
  timeline: TimelineEvent[];
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'user';
}

export interface AppNotification {
  id: string;
  userId: string;
  message: string;
  type: 'targeted' | 'broadcast';
  read: boolean;
  createdAt: any;
  senderId?: string;
}
