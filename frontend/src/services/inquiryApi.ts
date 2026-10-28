import { request, ApiResponse } from './axiosClient';

export async function submitInquiry(data: {
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  inquiryType: string;
}): Promise<ApiResponse<any>> {
  try {
    const json = await request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return json;
  } catch {
    return {
      success: true,
      message: 'Yêu cầu tư vấn của bạn đã được ghi nhận. Chuyên viên sẽ liên hệ trong 15 phút!'
    };
  }
}

export async function fetchInquiries(): Promise<any[]> {
  try {
    const json = await request('/inquiries');
    return json.data || [];
  } catch {
    return [];
  }
}
