import { BlogPost, BlogCategory } from '../types/blog';
import { BLOG_POSTS } from '../data/blogPosts';

const STORAGE_KEY = 'bds_blog_posts';

export class BlogService {
  private static getStoredPosts(): BlogPost[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Lỗi khi đọc dữ liệu blog từ localStorage:', e);
    }
    // Khởi tạo mặc định nếu chưa có
    localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOG_POSTS));
    return [...BLOG_POSTS];
  }

  private static savePosts(posts: BlogPost[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      // Dispatch custom event để các component lắng nghe
      window.dispatchEvent(new Event('bds-blog-updated'));
    } catch (e) {
      console.error('Lỗi khi lưu dữ liệu blog vào localStorage:', e);
    }
  }

  public static getAllPosts(): BlogPost[] {
    return this.getStoredPosts();
  }

  public static getPostById(idOrSlug: string): BlogPost | undefined {
    const posts = this.getStoredPosts();
    return posts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  }

  public static createPost(data: Partial<BlogPost>): BlogPost {
    const posts = this.getStoredPosts();
    const id = 'post-' + Date.now();
    const slug = data.title
      ? data.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      : 'bai-viet-' + id;

    const newPost: BlogPost = {
      id,
      slug,
      title: data.title || 'Tiêu đề bài viết mới',
      excerpt: data.excerpt || '',
      category: data.category || 'thi-truong',
      categoryName: data.categoryName || this.getCategoryLabel(data.category || 'thi-truong'),
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      imageAlt: data.imageAlt || data.title || 'Hình ảnh bài viết',
      publishedAt: data.publishedAt || new Date().toLocaleDateString('vi-VN'),
      readTime: data.readTime || '5 phút đọc',
      views: data.views || 1,
      likes: data.likes || 0,
      featured: !!data.featured,
      popular: !!data.popular,
      author: data.author || {
        name: 'Ban Biên Tập GreenNest',
        role: 'Chuyên gia BĐS & Pháp lý',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        bio: 'Đội ngũ chuyên viên nghiên cứu thị trường và tư vấn pháp lý bất động sản.'
      },
      tags: data.tags && data.tags.length > 0 ? data.tags : ['Bất động sản', 'Pháp lý'],
      tableOfContents: data.tableOfContents || [
        { id: 'tong-quan', title: '1. Nội dung trọng tâm bài viết', level: 2 }
      ],
      contentSections: data.contentSections && data.contentSections.length > 0
        ? data.contentSections
        : [
            {
              id: 'tong-quan',
              heading: '1. Nội dung trọng tâm bài viết',
              paragraphs: [
                data.excerpt || 'Nội dung chi tiết đang được cập nhật bởi ban biên tập.'
              ]
            }
          ],
      seo: data.seo || {
        title: data.title || 'Bài viết Bất Động Sản',
        metaDescription: data.excerpt || '',
        keywords: data.tags || ['bất động sản']
      }
    };

    const updatedPosts = [newPost, ...posts];
    this.savePosts(updatedPosts);
    return newPost;
  }

  public static updatePost(id: string, updatedData: Partial<BlogPost>): BlogPost | null {
    const posts = this.getStoredPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    const current = posts[index];
    const categoryName = updatedData.category
      ? this.getCategoryLabel(updatedData.category)
      : current.categoryName;

    const updated: BlogPost = {
      ...current,
      ...updatedData,
      categoryName,
      author: {
        ...current.author,
        ...(updatedData.author || {})
      },
      seo: {
        ...current.seo,
        ...(updatedData.seo || {})
      }
    };

    posts[index] = updated;
    this.savePosts(posts);
    return updated;
  }

  public static deletePost(id: string): boolean {
    const posts = this.getStoredPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    this.savePosts(filtered);
    return true;
  }

  public static togglePostFeatured(id: string): BlogPost | null {
    const posts = this.getStoredPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index].featured = !posts[index].featured;
    this.savePosts(posts);
    return posts[index];
  }

  public static getCategoryLabel(category: BlogCategory): string {
    switch (category) {
      case 'thi-truong':
        return 'Tin thị trường';
      case 'du-an':
        return 'Tiến độ dự án';
      case 'tai-chinh':
        return 'Pháp luật & Tài chính';
      case 'phong-thuy':
        return 'Phong thủy & Mẹo nhà đất';
      case 'cau-chuyen':
        return 'Kinh nghiệm mua bán';
      default:
        return 'Bất động sản';
    }
  }
}

export default BlogService;
