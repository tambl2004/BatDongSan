export type BlogCategory = 
  | 'thi-truong'    // Tin tức và diễn biến thị trường
  | 'du-an'         // Đánh giá và phân tích dự án / Cơ hội đầu tư
  | 'tai-chinh'      // Kiến thức & tư vấn tài chính, pháp lý
  | 'phong-thuy'     // Mẹo phong thủy, thiết kế & bảo trì nhà cửa
  | 'cau-chuyen';    // Câu chuyện khách hàng (Storytelling)

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface ContentSection {
  id: string;
  heading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    author?: string;
  };
  highlightBox?: {
    title: string;
    text: string;
    type?: 'info' | 'tip' | 'warning';
  };
  image?: {
    url: string;
    alt: string;
    caption: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  checklist?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryName: string;
  coverImage: string;
  imageAlt: string;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  featured?: boolean;
  popular?: boolean;
  author: BlogAuthor;
  tags: string[];
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
  contentSections: ContentSection[];
  relatedPropertyId?: string; // Internal SEO link to Property ID
  relatedPropertyNote?: string;
  relatedPostIds?: string[];
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogFilterParams {
  category?: BlogCategory | 'all';
  search?: string;
  tag?: string;
  sort?: 'newest' | 'popular' | 'views';
}
