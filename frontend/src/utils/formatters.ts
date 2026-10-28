/**
 * Định dạng giá tiền bất động sản sang đơn vị Việt Nam ("tỷ", "triệu")
 */
export function formatPrice(price: number, listingType: 'sale' | 'rent' = 'sale'): string {
  if (listingType === 'rent') {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ/tháng`;
    }
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)} triệu/tháng`;
    }
    return `${price.toLocaleString('vi-VN')} đ/tháng`;
  }

  if (price >= 1000000000) {
    const billions = price / 1000000000;
    return Number.isInteger(billions) ? `${billions} tỷ` : `${billions.toFixed(1)} tỷ`;
  }

  if (price >= 1000000) {
    const millions = price / 1000000;
    return Number.isInteger(millions) ? `${millions} triệu` : `${millions.toFixed(1)} triệu`;
  }

  return `${price.toLocaleString('vi-VN')} đ`;
}

/**
 * Định dạng diện tích m²
 */
export function formatArea(area: number): string {
  return `${area.toLocaleString('vi-VN')} m²`;
}

/**
 * Tính đơn giá theo mét vuông
 */
export function calculatePricePerM2(price: number, area: number, listingType: 'sale' | 'rent' = 'sale'): string {
  if (!area || area <= 0) return '—';
  const perM2 = price / area;

  if (listingType === 'rent') {
    if (perM2 >= 1000000) {
      return `${(perM2 / 1000000).toFixed(1)} tr/m²/tháng`;
    }
    return `${(perM2 / 1000).toFixed(0)} nghìn/m²/tháng`;
  }

  if (perM2 >= 1000000000) {
    return `${(perM2 / 1000000000).toFixed(2)} tỷ/m²`;
  }
  return `${(perM2 / 1000000).toFixed(1)} triệu/m²`;
}
