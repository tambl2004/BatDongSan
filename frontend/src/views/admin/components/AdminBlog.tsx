import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Sparkles,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../../../types/blog';
import { BlogService } from '../../../services/blogService';
import { AdminBlogModal } from './AdminBlogModal';
import { notify } from '../../../utils/toast';
import { navigate } from '../../../router/router';

interface AdminBlogProps {
  searchQuery?: string;
}

export const AdminBlog: React.FC<AdminBlogProps> = ({ searchQuery: globalSearch = '' }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => BlogService.getAllPosts());
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Sync when event triggered
  useEffect(() => {
    const handleUpdate = () => {
      setPosts(BlogService.getAllPosts());
    };
    window.addEventListener('bds-blog-updated', handleUpdate);
    return () => window.removeEventListener('bds-blog-updated', handleUpdate);
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    const total = posts.length;
    const thiTruong = posts.filter(p => p.category === 'thi-truong').length;
    const duAn = posts.filter(p => p.category === 'du-an').length;
    const taiChinhPhapLuat = posts.filter(p => p.category === 'tai-chinh').length;
    const phongThuyKinhNghiem = posts.filter(p => p.category === 'phong-thuy' || p.category === 'cau-chuyen').length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

    return { total, thiTruong, duAn, taiChinhPhapLuat, phongThuyKinhNghiem, totalViews };
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return posts.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Featured only
      if (featuredOnly && !p.featured) {
        return false;
      }
      // Search
      if (q) {
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchExcerpt = p.excerpt.toLowerCase().includes(q);
        const matchAuthor = p.author.name.toLowerCase().includes(q);
        const matchTag = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchAuthor && !matchTag) return false;
      }
      return true;
    });
  }, [posts, localSearch, globalSearch, selectedCategory, featuredOnly]);

  const handleCreatePost = (postData: Partial<BlogPost>) => {
    const created = BlogService.createPost(postData);
    setPosts(BlogService.getAllPosts());
    notify.success(`Đã đăng tải bài viết mới: "${created.title}"`);
  };

  const handleUpdatePost = (postData: Partial<BlogPost>) => {
    if (!editingPost) return;
    const updated = BlogService.updatePost(editingPost.id, postData);
    if (updated) {
      setPosts(BlogService.getAllPosts());
      notify.success(`Đã cập nhật bài viết: "${updated.title}"`);
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      BlogService.deletePost(id);
      setPosts(BlogService.getAllPosts());
      notify.success('Đã xóa bài viết khỏi hệ thống');
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updated = BlogService.togglePostFeatured(id);
    if (updated) {
      setPosts(BlogService.getAllPosts());
      if (updated.featured) {
        notify.success('Đã ghim bài viết nổi bật lên trang chủ!');
      } else {
        notify.info('Đã bỏ ghim bài viết nổi bật');
      }
    }
  };

  const getCategoryBadge = (category: BlogCategory) => {
    switch (category) {
      case 'tai-chinh':
        return { label: '⚖️ Pháp luật & Tài chính', bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' };
      case 'thi-truong':
        return { label: '📈 Tin thị trường', bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' };
      case 'du-an':
        return { label: '🏗️ Tiến độ dự án', bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
      case 'phong-thuy':
        return { label: '🏡 Phong thủy & Mẹo', bg: '#fffbeb', color: '#b45309', border: '#fde68a' };
      case 'cau-chuyen':
        return { label: '💡 Kinh nghiệm mua bán', bg: '#fdf2f8', color: '#be185d', border: '#fbcfe8' };
      default:
        return { label: 'Bất động sản', bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. Header & Quick Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.15rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Tổng số bài viết</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            {stats.total} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>bài</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '4px' }}>
            Đang hiển thị công khai trên web
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.15rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Pháp luật & Tài chính BĐS</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#6d28d9', marginTop: '4px' }}>
            {stats.taiChinhPhapLuat} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>bài</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
            Luật đất đai, sổ hồng, thuế phí
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.15rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Thị trường & Tiến độ dự án</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>
            {stats.thiTruong + stats.duAn} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>bài</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
            Đòn bẩy hạ tầng, Metro, Vành đai
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.15rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Tổng lượt người đọc</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {stats.totalViews.toLocaleString('vi-VN')} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>lượt</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '4px' }}>
            Tương tác tự nhiên & SEO
          </div>
        </div>
      </div>

      {/* 2. Control Bar (Filter & Add Button) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        {/* Left: Search & Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
          <div style={{ position: 'relative', minWidth: '220px', maxWidth: '320px', flex: 1 }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Tìm theo tiêu đề, tác giả, tag..."
              style={{
                width: '100%',
                padding: '7px 10px 7px 32px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                color: '#1e293b',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            style={{
              padding: '7px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: '#f8fafc',
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="all">Chuyên mục: Tất cả</option>
            <option value="thi-truong">Tin thị trường & Quy hoạch</option>
            <option value="du-an">Tiến độ & Đánh giá dự án</option>
            <option value="tai-chinh">Pháp luật & Tài chính nhà đất</option>
            <option value="phong-thuy">Phong thủy & Thiết kế</option>
            <option value="cau-chuyen">Kinh nghiệm mua bán</option>
          </select>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              style={{ width: '15px', height: '15px', accentColor: '#059669' }}
            />
            <span>Chỉ bài nổi bật (VIP)</span>
          </label>
        </div>

        {/* Right: Add Post Button */}
        <button
          type="button"
          onClick={() => {
            setEditingPost(null);
            setIsModalOpen(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            borderRadius: '8px',
            backgroundColor: '#059669',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.825rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
          }}
        >
          <Plus size={16} />
          <span>Đăng tải bài viết mới</span>
        </button>
      </div>

      {/* 3. Main Articles Table */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                <th style={{ padding: '12px 14px', width: '80px' }}>Ảnh bìa</th>
                <th style={{ padding: '12px 14px' }}>Tiêu đề & Tóm tắt</th>
                <th style={{ padding: '12px 14px', width: '160px' }}>Chuyên mục</th>
                <th style={{ padding: '12px 14px', width: '140px' }}>Tác giả</th>
                <th style={{ padding: '12px 14px', width: '120px' }}>Ngày đăng</th>
                <th style={{ padding: '12px 14px', width: '90px', textAlign: 'center' }}>Lượt xem</th>
                <th style={{ padding: '12px 14px', width: '130px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                    <BookOpen size={40} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Không tìm thấy bài viết nào.</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>Thử tìm kiếm với từ khóa khác hoặc bấm nút đăng tải bài viết mới.</div>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const catBadge = getCategoryBadge(post.category);
                  return (
                    <tr
                      key={post.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Cover Thumbnail */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{
                          position: 'relative',
                          width: '70px',
                          height: '50px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: '1px solid #e2e8f0'
                        }}>
                          <img
                            src={post.coverImage}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {post.featured && (
                            <span
                              title="Bài viết nổi bật (VIP)"
                              style={{
                                position: 'absolute',
                                top: '2px',
                                left: '2px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                backgroundColor: '#d97706',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Sparkles size={10} />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Title & Excerpt */}
                      <td style={{ padding: '10px 14px', maxWidth: '380px' }}>
                        <div
                          onClick={() => navigate('/blog-detail?id=' + post.id)}
                          style={{
                            fontWeight: 700,
                            color: '#0f172a',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            lineHeight: 1.35,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#059669')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
                        >
                          {post.title}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#64748b',
                          marginTop: '4px',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {post.excerpt}
                        </div>
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                style={{
                                  fontSize: '0.675rem',
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  backgroundColor: '#f1f5f9',
                                  color: '#475569'
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Category Badge */}
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          backgroundColor: catBadge.bg,
                          color: catBadge.color,
                          border: `1px solid ${catBadge.border}`
                        }}>
                          {catBadge.label}
                        </span>
                      </td>

                      {/* Author */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{post.author.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{post.author.role}</div>
                      </td>

                      {/* Publish Date */}
                      <td style={{ padding: '10px 14px', color: '#475569', fontSize: '0.775rem' }}>
                        <div>{post.publishedAt}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{post.readTime}</div>
                      </td>

                      {/* Views */}
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {(post.views || 0).toLocaleString('vi-VN')}
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          {/* Toggle Featured */}
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(post.id)}
                            title={post.featured ? 'Bỏ ghim nổi bật' : 'Ghim làm bài viết nổi bật'}
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: post.featured ? '1px solid #fde68a' : '1px solid #e2e8f0',
                              backgroundColor: post.featured ? '#fffbeb' : '#ffffff',
                              color: post.featured ? '#d97706' : '#94a3b8',
                              cursor: 'pointer'
                            }}
                          >
                            <Sparkles size={15} />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPost(post);
                              setIsModalOpen(true);
                            }}
                            title="Chỉnh sửa bài viết"
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff',
                              color: '#475569',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit size={15} />
                          </button>

                          {/* View on website */}
                          <button
                            type="button"
                            onClick={() => navigate('/blog-detail?id=' + post.id)}
                            title="Xem trên trang người dùng"
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff',
                              color: '#0284c7',
                              cursor: 'pointer'
                            }}
                          >
                            <ExternalLink size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id, post.title)}
                            title="Xóa bài viết"
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              border: '1px solid #fecdd3',
                              backgroundColor: '#ffffff',
                              color: '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Blog Post */}
      <AdminBlogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        onSave={editingPost ? handleUpdatePost : handleCreatePost}
        editingPost={editingPost}
      />
    </div>
  );
};

export default AdminBlog;
