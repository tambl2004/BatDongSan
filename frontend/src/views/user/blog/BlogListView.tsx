import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '../../../types/blog';
import { Property } from '../../../types/property';
import { BLOG_CATEGORIES } from '../../../data/blogPosts';
import { BlogCard } from './BlogCard';
import {
  Search,
  SlidersHorizontal,
  Flame,
  TrendingUp,
  Tag,
  Mail,
  PhoneCall,
  CheckCircle2,
  Building,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  X
} from 'lucide-react';

interface BlogListViewProps {
  posts: BlogPost[];
  properties: Property[];
  onSelectPost: (post: BlogPost) => void;
  onSelectProperty: (property: Property) => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({
  posts,
  properties,
  onSelectPost,
  onSelectProperty
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'views'>('newest');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Extract featured post for top spotlight
  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured) || posts[0];
  }, [posts]);

  // Extract popular posts for sidebar
  const popularPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  }, [posts]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet).slice(0, 10);
  }, [posts]);

  // Filtered & sorted posts for main grid
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'views') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else {
      // Default: Keep order or by date
      result.sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1));
    }

    return result;
  }, [posts, selectedCategory, selectedTag, searchQuery, sortBy]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Header Section */}
      <section style={{
        backgroundColor: 'var(--bg-subtle)',
        borderBottom: '1px solid var(--border)',
        padding: '3rem 0 2.5rem 0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'var(--green-light)',
              color: 'var(--green-dark)',
              border: '1px solid var(--green-border)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              <Sparkles size={14} color="var(--green-primary)" />
              Cẩm Nang & Tri Thức Bất Động Sản Toàn Diện
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem'
            }}>
              Tin Tức, Phân Tích & Cẩm Nang Bất Động Sản
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Cập nhật biến động thị trường, đánh giá thực tế dự án, cẩm nang tài chính pháp lý và phong thủy nhà ở chuẩn xác từ các chuyên gia đầu ngành.
            </p>

            {/* Quick stats pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" />
                <span>5 chuyên mục chuyên sâu</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" />
                <span>100% bài viết kiểm duyệt pháp lý</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--green-primary)" />
                <span>Hơn 50,000 độc giả mỗi tháng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Spotlight: Top Featured Article */}
      {featuredPost && !searchQuery && selectedCategory === 'all' && !selectedTag && (
        <section style={{ padding: '2.5rem 0 1.5rem 0' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--green-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}>
              <Flame size={18} color="var(--green-primary)" />
              Tiêu Điểm Nổi Bật Trong Tuần
            </div>

            <div
              onClick={() => onSelectPost(featuredPost)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Cover Image */}
              <div style={{ minHeight: '340px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'var(--green-primary)',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {featuredPost.categoryName}
                </span>
              </div>

              {/* Content Box */}
              <div style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    {featuredPost.publishedAt}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {featuredPost.readTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={14} color="var(--green-primary)" />
                    {featuredPost.views.toLocaleString()} lượt đọc
                  </span>
                </div>

                <h2 style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  color: 'var(--text-main)',
                  marginBottom: '0.85rem'
                }}>
                  {featuredPost.title}
                </h2>

                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.25rem',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {featuredPost.author.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <span className="btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                    <span>Đọc phân tích</span>
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar Section */}
      <section style={{
        position: 'sticky',
        top: '70px',
        zIndex: 90,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        padding: '0.85rem 0',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {/* Category Chips */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '2px',
              maxWidth: '100%'
            }}>
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedTag(null);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'var(--green-primary)' : 'var(--bg-subtle)',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      border: isActive ? '1px solid var(--green-primary)' : '1px solid var(--border)',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      opacity: isActive ? 0.9 : 0.6,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                <input
                  type="text"
                  placeholder="Tìm bài viết, từ khóa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 28px 6px 32px',
                    fontSize: '0.825rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '8px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <SlidersHorizontal size={14} color="var(--text-secondary)" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '0.825rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="views">Lượt đọc nhiều</option>
                  <option value="popular">Yêu thích nhất</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Tag indicator */}
          {selectedTag && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.65rem',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)'
            }}>
              <span>Đang lọc theo thẻ: <strong>#{selectedTag}</strong></span>
              <button
                onClick={() => setSelectedTag(null)}
                style={{
                  color: '#ef4444',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '0.78rem'
                }}
              >
                <X size={12} /> Bỏ lọc thẻ
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content 2-Column: Grid + Sidebar */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Main Articles Grid */}
          <div>
            {filteredPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border)'
              }}>
                <Search size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Không tìm thấy bài viết phù hợp
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Vui lòng thử tìm kiếm bằng từ khóa khác hoặc quay lại xem toàn bộ bài viết.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.25rem' }}
                >
                  Xem tất cả bài viết
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '1.75rem'
              }}>
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} onSelectPost={onSelectPost} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar: Popular, Hot Tags, Newsletter & Property Internal Link */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Top 5 Popular Posts (Bài viết đọc nhiều nhất) */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '0.65rem'
              }}>
                <TrendingUp size={18} color="var(--green-primary)" />
                Bài Viết Đọc Nhiều Nhất
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {popularPosts.map((post, index) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      onSelectPost(post);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      alignItems: 'flex-start',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Rank Badge */}
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: index < 3 ? 'var(--green-primary)' : 'var(--bg-subtle)',
                      color: index < 3 ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      flexShrink: 0
                    }}>
                      0{index + 1}
                    </span>

                    {/* Post Title & Views */}
                    <div>
                      <h4 style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        color: 'var(--text-main)',
                        marginBottom: '4px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.title}
                      </h4>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        {post.views.toLocaleString()} lượt đọc • {post.readTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter CTA Box (Đăng ký nhận bản tin) */}
            <div style={{
              backgroundColor: 'var(--green-light)',
              border: '1px solid var(--green-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--green-dark)',
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>
                <Mail size={15} color="var(--green-primary)" />
                Bản Tin Bất Động Sản Tuần
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Đăng Ký Nhận Báo Cáo Thị Trường
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Nhận các phân tích giá nhà đất, cảnh báo quy hoạch và cơ hội đầu tư sinh lời gửi trực tiếp vào email mỗi sáng thứ Hai.
              </p>

              {newsletterSubscribed ? (
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--green-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem',
                  textAlign: 'center',
                  fontSize: '0.825rem',
                  color: 'var(--green-dark)',
                  fontWeight: 600
                }}>
                  <CheckCircle2 size={20} color="var(--green-primary)" style={{ margin: '0 auto 4px' }} />
                  Đăng ký thành công! Hãy kiểm tra hộp thư của bạn.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    style={{
                      padding: '0.6rem 0.75rem',
                      fontSize: '0.825rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      outline: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                  >
                    Đăng ký nhận tin
                  </button>
                </form>
              )}
            </div>

            {/* Hot Tags Cloud (Chủ đề được quan tâm) */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '0.85rem'
              }}>
                <Tag size={16} color="var(--green-primary)" />
                Chủ Đề Nổi Bật
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {allTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTag(tag);
                      setSelectedCategory('all');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    style={{
                      backgroundColor: selectedTag === tag ? 'var(--green-primary)' : 'var(--bg-subtle)',
                      color: selectedTag === tag ? '#ffffff' : 'var(--text-secondary)',
                      border: selectedTag === tag ? '1px solid var(--green-primary)' : '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '4px 10px',
                      fontSize: '0.775rem',
                      fontWeight: 500,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Internal Link Showcase to Properties */}
            {properties.length > 0 && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  marginBottom: '0.85rem'
                }}>
                  <Building size={16} color="var(--green-primary)" />
                  Bất Động Sản Nổi Bật
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {properties.slice(0, 2).map((property) => (
                    <div
                      key={property.id}
                      onClick={() => onSelectProperty(property)}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        style={{
                          width: '72px',
                          height: '56px',
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          lineHeight: 1.35,
                          color: 'var(--text-main)',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {property.title}
                        </div>
                        <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--green-primary)', marginTop: '2px' }}>
                          {property.priceFormatted}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Hotline Consultation Box */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'center'
            }}>
              <PhoneCall size={22} color="var(--green-primary)" style={{ margin: '0 auto 0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Tư vấn mua bán & định giá BĐS
              </div>
              <a
                href="tel:19006868"
                style={{
                  display: 'block',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--green-primary)',
                  marginTop: '0.2rem'
                }}
              >
                1900 6868
              </a>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Hỗ trợ 24/7 từ chuyên viên cấp cao
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
