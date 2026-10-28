export type InquiryStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export type InquiryType = 'viewing' | 'consultation' | 'price_offer' | 'valuation' | 'loan';

export interface PropertyInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
}
