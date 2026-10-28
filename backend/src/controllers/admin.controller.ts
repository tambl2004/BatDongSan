import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { adminService } from '../services/admin.service';
import { propertyService } from '../services/property.service';
import { inquiryService } from '../services/inquiry.service';
import { authService } from '../services/auth.service';

export class AdminController {
  // 1. Thống kê tổng hợp hệ thống
  public static getStats = catchAsync(async (_req: Request, res: Response) => {
    const stats = adminService.getSystemStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  });

  // 2. Quản lý Bất động sản
  public static getProperties = catchAsync(async (req: Request, res: Response) => {
    const { status, propertyType, search, sort, page, limit } = req.query;

    let properties = propertyService.getAllPropertiesRaw();

    if (status && status !== 'all') {
      properties = properties.filter(p => p.status === status);
    }

    if (propertyType && propertyType !== 'all') {
      properties = properties.filter(p => p.propertyType === propertyType);
    }

    if (search) {
      const q = String(search).toLowerCase().trim();
      properties = properties.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }

    const total = properties.length;
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 50;
    const paginated = properties.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    res.status(200).json({
      success: true,
      data: paginated,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  });

  public static updatePropertyStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new AppError('Trạng thái không được để trống', 400);
    }

    const updated = propertyService.updatePropertyStatus(id, status);
    if (!updated) {
      throw new AppError('Không tìm thấy bất động sản', 404);
    }

    res.status(200).json({
      success: true,
      message: `Cập nhật trạng thái BĐS sang "${status}" thành công`,
      data: updated
    });
  });

  public static togglePropertyFeatured = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = propertyService.togglePropertyFeatured(id);
    if (!updated) {
      throw new AppError('Không tìm thấy bất động sản', 404);
    }

    res.status(200).json({
      success: true,
      message: updated.featured ? 'Đã ghim tin nổi bật (VIP)' : 'Đã bỏ ghim tin nổi bật',
      data: updated
    });
  });

  public static updateProperty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = propertyService.updateProperty(id, req.body);
    if (!updated) {
      throw new AppError('Không tìm thấy bất động sản để cập nhật', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin bất động sản thành công',
      data: updated
    });
  });

  public static deleteProperty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const success = propertyService.deleteProperty(id);
    if (!success) {
      throw new AppError('Không tìm thấy bất động sản để xóa', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Đã xóa bất động sản khỏi hệ thống'
    });
  });

  // 3. Quản lý Yêu cầu tư vấn / Leads
  public static getInquiries = catchAsync(async (req: Request, res: Response) => {
    const { status, type, search } = req.query;
    const inquiries = inquiryService.getInquiries({
      status: status as string,
      type: type as string,
      search: search as string
    });

    res.status(200).json({
      success: true,
      data: inquiries
    });
  });

  public static updateInquiry = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = inquiryService.updateInquiry(id, req.body);
    if (!updated) {
      throw new AppError('Không tìm thấy yêu cầu tư vấn', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật yêu cầu tư vấn thành công',
      data: updated
    });
  });

  public static deleteInquiry = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const success = inquiryService.deleteInquiry(id);
    if (!success) {
      throw new AppError('Không tìm thấy yêu cầu tư vấn để xóa', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Đã xóa yêu cầu tư vấn'
    });
  });

  // 4. Quản lý Người dùng & Môi giới
  public static getUsers = catchAsync(async (req: Request, res: Response) => {
    const { role, status, search } = req.query;
    const users = authService.getAllUsers({
      role: role as string,
      status: status as string,
      search: search as string
    });

    res.status(200).json({
      success: true,
      data: users
    });
  });

  public static createUser = catchAsync(async (req: Request, res: Response) => {
    const { fullName, email, phone, role, status, password } = req.body;
    if (!fullName || !email) {
      throw new AppError('Họ tên và email là bắt buộc', 400);
    }

    const newUser = authService.createUserByAdmin({
      fullName,
      email,
      phone,
      password,
      role: role || 'user',
      status: status || 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Tạo tài khoản người dùng thành công',
      data: newUser
    });
  });

  public static updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = authService.updateUserByAdmin(id, req.body);
    if (!updated) {
      throw new AppError('Không tìm thấy người dùng', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật tài khoản thành công',
      data: updated
    });
  });

  public static deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const success = authService.deleteUserByAdmin(id);
    if (!success) {
      throw new AppError('Không tìm thấy người dùng để xóa', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Đã xóa tài khoản khỏi hệ thống'
    });
  });

  // 5. Cài đặt hệ thống
  public static getSettings = catchAsync(async (_req: Request, res: Response) => {
    const settings = adminService.getSettings();
    res.status(200).json({
      success: true,
      data: settings
    });
  });

  public static updateSettings = catchAsync(async (req: Request, res: Response) => {
    const updated = adminService.updateSettings(req.body);
    res.status(200).json({
      success: true,
      message: 'Cập nhật cấu hình hệ thống thành công',
      data: updated
    });
  });
}
