export interface District {
  code: string;
  name: string;
}

export interface CityLocation {
  code: string;
  name: string;
  districts: District[];
}

export const VIETNAM_LOCATIONS: CityLocation[] = [
  {
    code: 'HCM',
    name: 'Hồ Chí Minh',
    districts: [
      { code: 'Q1', name: 'Quận 1' },
      { code: 'TD', name: 'Thành phố Thủ Đức' },
      { code: 'Q7', name: 'Quận 7' },
      { code: 'BT', name: 'Quận Bình Thạnh' }
    ]
  },
  {
    code: 'HN',
    name: 'Hà Nội',
    districts: [
      { code: 'HK', name: 'Quận Hoàn Kiếm' },
      { code: 'CG', name: 'Quận Cầu Giấy' },
      { code: 'LB', name: 'Quận Long Biên' },
      { code: 'TX', name: 'Quận Thanh Xuân' }
    ]
  },
  {
    code: 'DN',
    name: 'Đà Nẵng',
    districts: [
      { code: 'HC', name: 'Quận Hải Châu' },
      { code: 'ST', name: 'Quận Sơn Trà' }
    ]
  }
];
