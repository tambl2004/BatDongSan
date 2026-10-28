export type AdminTab = 'dashboard' | 'properties' | 'inquiries' | 'users' | 'settings';

export interface AdminInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  propertyTitle: string;
  inquiryType: 'viewing' | 'consultation' | 'price_offer' | 'service' | string;
  status: 'pending' | 'contacted';
  message?: string;
  createdAt: string;
}
