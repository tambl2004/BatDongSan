import { Request, Response, NextFunction } from 'express';
import { propertyService } from '../services/property.service';
import { PropertyFilterParams } from '../types/property';

export class PropertyController {
  public static getProperties(req: Request, res: Response, next: NextFunction): void {
    try {
      const {
        city,
        district,
        propertyType,
        listingType,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        bedrooms,
        search,
        sort,
        page,
        limit
      } = req.query;

      const filterParams: PropertyFilterParams = {
        city: city as string,
        district: district as string,
        propertyType: propertyType as any,
        listingType: listingType as any,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minArea: minArea ? Number(minArea) : undefined,
        maxArea: maxArea ? Number(maxArea) : undefined,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        search: search as string,
        sort: sort as any,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10
      };

      const result = propertyService.getAllProperties(filterParams);
      res.json({
        success: true,
        data: result.data,
        meta: result.meta
      });
    } catch (error) {
      next(error);
    }
  }

  public static getPropertyById(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      const property = propertyService.getPropertyById(id);

      if (!property) {
        res.status(404).json({
          success: false,
          message: 'Không tìm thấy bất động sản'
        });
        return;
      }

      res.json({
        success: true,
        data: property
      });
    } catch (error) {
      next(error);
    }
  }

  public static getFeaturedProperties(req: Request, res: Response, next: NextFunction): void {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 4;
      const featured = propertyService.getFeaturedProperties(limit);

      res.json({
        success: true,
        data: featured
      });
    } catch (error) {
      next(error);
    }
  }

  public static getLocations(req: Request, res: Response, next: NextFunction): void {
    try {
      const locations = propertyService.getLocations();
      res.json({
        success: true,
        data: locations
      });
    } catch (error) {
      next(error);
    }
  }

  public static createProperty(req: Request, res: Response, next: NextFunction): void {
    try {
      const newProperty = propertyService.createProperty(req.body);
      res.status(201).json({
        success: true,
        data: newProperty,
        message: 'Tạo bất động sản thành công'
      });
    } catch (error) {
      next(error);
    }
  }
}
