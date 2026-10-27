export type InquiryType = 'viewing' | 'consultation' | 'price_offer' | 'service';

export type InquiryStatus = 'pending' | 'contacted' | 'completed' | 'cancelled';

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  createdAt: string;
}
