import { PropertyInquiry, InquiryStatus } from '../types/inquiry';

export class InquiryService {
  private inquiries: PropertyInquiry[] = [
    {
      id: 'inq-001',
      propertyId: 'bds-001',
      propertyTitle: 'Căn hộ Penthouse Masteri Thảo Điền view trọn sông Sài Gòn & Landmark 81',
      fullName: 'Trần Minh Đức',
      phone: '0918 889 999',
      email: 'duc.tran@investor.vn',
      message: 'Tôi muốn hẹn xem nhà trực tiếp vào chiều Thứ Bảy tuần này.',
      inquiryType: 'viewing',
      status: 'new',
      notes: 'Khách hẹn xem vào 15:00 Thứ 7.',
      createdAt: '2026-10-27T08:30:00Z'
    },
    {
      id: 'inq-002',
      propertyId: 'bds-002',
      propertyTitle: 'Biệt thự đơn lập Chateau Phú Mỹ Hưng kiến trúc Tân Cổ Điển ven sông cảnh quan',
      fullName: 'Lê Hoàng Yến',
      phone: '0903 555 777',
      email: 'yen.le@gmail.com',
      message: 'Xin file sổ đỏ scan và bảng tính dự toán thuế sang tên.',
      inquiryType: 'consultation',
      status: 'contacted',
      notes: 'Đã gửi hồ sơ qua Zalo cho khách.',
      createdAt: '2026-10-26T14:15:00Z'
    },
    {
      id: 'inq-003',
      propertyId: 'bds-003',
      propertyTitle: 'Căn hộ 2PN hiện đại Lumiere Riverside An Phú view trọn công viên Metro',
      fullName: 'Phạm Văn Hùng',
      phone: '0982 123 789',
      email: 'hung.pham@vietcapital.com',
      message: 'Đàm phán thương lượng thanh toán nhanh trong 10 ngày.',
      inquiryType: 'price_offer',
      status: 'scheduled',
      notes: 'Chuẩn bị hợp đồng cọc.',
      createdAt: '2026-10-25T11:00:00Z'
    }
  ];

  public createInquiry(data: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'> & { status?: InquiryStatus }): PropertyInquiry {
    const inquiry: PropertyInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: data.status || 'new',
      createdAt: new Date().toISOString()
    };
    this.inquiries.unshift(inquiry);
    return inquiry;
  }

  public getInquiries(filters?: { status?: string; type?: string; search?: string }): PropertyInquiry[] {
    let result = [...this.inquiries];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter(i => i.status === filters.status);
    }

    if (filters?.type && filters.type !== 'all') {
      result = result.filter(i => i.inquiryType === filters.type);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(i =>
        i.fullName.toLowerCase().includes(q) ||
        i.phone.includes(q) ||
        i.propertyTitle.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public updateInquiry(id: string, updateData: Partial<PropertyInquiry>): PropertyInquiry | undefined {
    const index = this.inquiries.findIndex(i => i.id === id);
    if (index === -1) return undefined;

    this.inquiries[index] = {
      ...this.inquiries[index],
      ...updateData
    };
    return this.inquiries[index];
  }

  public deleteInquiry(id: string): boolean {
    const initialLength = this.inquiries.length;
    this.inquiries = this.inquiries.filter(i => i.id !== id);
    return this.inquiries.length < initialLength;
  }
}

export const inquiryService = new InquiryService();
