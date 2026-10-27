import React from 'react';
import { BlogPost } from '../../../types/blog';
import { Clock, Eye, Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onSelectPost }) => {
  const getCategoryColor = (category: BlogPost['category']) => {
    switch (category) {
      case 'thi-truong':
        return { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' };
      case 'du-an':
        return { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' };
      case 'tai-chinh':
        return { bg: '#fefce8', text: '#a16207', border: '#fef08a' };
      case 'phong-thuy':
        return { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' };
      case 'cau-chuyen':
        return { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  };

  const catStyle = getCategoryColor(post.category);

  return (
    <article
      onClick={() => onSelectPost(post)}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--shadow-sm)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--green-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
        <img
          src={post.coverImage}
          alt={post.imageAlt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        {/* Category Badge */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: catStyle.bg,
            color: catStyle.text,
            border: `1px solid ${catStyle.border}`,
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(4px)'
          }}
        >
          {post.categoryName}
        </span>

        {/* Read Time Pill */}
        <span
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.72rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Clock size={12} />
          {post.readTime}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Meta info: Date & Views */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.775rem',
          color: 'var(--text-muted)',
          marginBottom: '0.65rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} />
            {post.publishedAt}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={13} />
            {post.views.toLocaleString()} lượt đọc
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          lineHeight: 1.45,
          marginBottom: '0.65rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {post.excerpt}
        </p>

        {/* Footer: Author & Read CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '0.85rem',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid var(--border)'
              }}
            />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {post.author.name}
            </span>
          </div>

          <span style={{
            fontSize: '0.825rem',
            fontWeight: 700,
            color: 'var(--green-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            Đọc bài <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
};
