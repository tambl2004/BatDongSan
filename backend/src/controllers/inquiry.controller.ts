import { Request, Response, NextFunction } from 'express';
import { inquiryService } from '../services/inquiry.service';

export class InquiryController {
  public static createInquiry(req: Request, res: Response, next: NextFunction): void {
    try {
      const { propertyId, propertyTitle, fullName, phone, email, message, inquiryType } = req.body;

      if (!fullName || !phone) {
        res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp họ tên và số điện thoại liên hệ'
        });
        return;
      }

      const inquiry = inquiryService.createInquiry({
        propertyId: propertyId || '',
        propertyTitle: propertyTitle || '',
        fullName,
        phone,
        email: email || '',
        message: message || '',
        inquiryType: inquiryType || 'consultation'
      });

      res.status(201).json({
        success: true,
        message: 'Yêu cầu tư vấn của quý khách đã được gửi thành công. Chuyên viên sẽ liên hệ trong ít phút!',
        data: inquiry
      });
    } catch (error) {
      next(error);
    }
  }

  public static getInquiries(_req: Request, res: Response, next: NextFunction): void {
    try {
      const inquiries = inquiryService.getInquiries();
      res.json({
        success: true,
        data: inquiries
      });
    } catch (error) {
      next(error);
    }
  }
}
