export interface PropertyInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  inquiryType: 'viewing' | 'consultation' | 'price_offer';
  createdAt: string;
}
