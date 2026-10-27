import { PropertyInquiry } from '../types/inquiry';

export class InquiryService {
  private inquiries: PropertyInquiry[] = [];

  public createInquiry(data: Omit<PropertyInquiry, 'id' | 'createdAt'>): PropertyInquiry {
    const inquiry: PropertyInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.inquiries.push(inquiry);
    return inquiry;
  }

  public getInquiries(): PropertyInquiry[] {
    return this.inquiries;
  }
}

export const inquiryService = new InquiryService();
