import React, { useState } from 'react';
import { BlogPost } from '../../../types/blog';
import { Property } from '../../../types/property';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  Building,
  MapPin,
  Tag,
  Sparkles,
  AlertTriangle,
  Info,
  Lightbulb,
  PhoneCall,
  Send,
  Check
} from 'lucide-react';

interface BlogDetailViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  allProperties: Property[];
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectProperty: (property: Property) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  post,
  allPosts,
  allProperties,
  onBack,
  onSelectPost,
  onSelectProperty
}) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [ctaName, setCtaName] = useState('');
  const [ctaPhone, setCtaPhone] = useState('');
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  // Find related internal property if exists
  const relatedProperty = post.relatedPropertyId
    ? allProperties.find(p => p.id === post.relatedPropertyId)
    : null;

  // Find related posts (same category or general)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.featured))
    .slice(0, 3);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaPhone.trim()) return;
    setCtaSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Top Breadcrumb & Back Bar */}
      <div style={{
        backgroundColor: 'var(--bg-subtle)',
        borderBottom: '1px solid var(--border)',
        padding: '0.85rem 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {/* Back button & Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)'
              }}
            >
              <ArrowLeft size={15} />
              <span>Về danh sách Blog</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-muted)' }}>Blog & Tin tức</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>{post.categoryName}</span>
          </div>

          {/* SEO Indicators Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#ffffff',
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border)',
            fontSize: '0.725rem',
            color: 'var(--text-secondary)'
          }}>
            <Sparkles size={12} color="var(--green-primary)" />
            <span>Chuẩn SEO: <strong>Title & Meta đầy đủ</strong></span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span>Internal Link: <strong>{relatedProperty ? 'Đã liên kết BĐS' : 'Tổng quan'}</strong></span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{ width: '100%' }}>
          {/* Post Header */}
          <header style={{ marginBottom: '2rem' }}>
            {/* Category & Date */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <span style={{
                backgroundColor: 'var(--green-light)',
                color: 'var(--green-dark)',
                border: '1px solid var(--green-border)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 700
              }}>
                {post.categoryName}
              </span>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  {post.publishedAt}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {post.readTime}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={14} />
                  {post.views.toLocaleString()} lượt đọc
                </span>
              </div>
            </div>

            {/* H1 SEO Title */}
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              lineHeight: 1.3,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem'
            }}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              borderLeft: '3px solid var(--green-primary)',
              paddingLeft: '1.25rem',
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              {post.excerpt}
            </p>

            {/* Author info & Actions bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)'
            }}>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--green-primary)'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {post.author.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Like & Share */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {/* Like Button */}
                <button
                  onClick={handleToggleLike}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: isLiked ? '1px solid #fecdd3' : '1px solid var(--border)',
                    backgroundColor: isLiked ? '#fff1f2' : '#ffffff',
                    color: isLiked ? '#e11d48' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Heart size={16} fill={isLiked ? '#e11d48' : 'none'} color={isLiked ? '#e11d48' : 'currentColor'} />
                  <span>{likes}</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    color: copiedLink ? 'var(--green-primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                  title="Sao chép liên kết bài viết"
                >
                  {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                  <span>{copiedLink ? 'Đã sao chép link' : 'Chia sẻ'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Hero Image */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)'
            }}>
              <img
                src={post.coverImage}
                alt={post.imageAlt}
                style={{ width: '100%', maxHeight: '540px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '0.6rem',
              fontStyle: 'italic'
            }}>
              {post.imageAlt}
            </p>
          </div>

          {/* Main 2-Column Layout: TOC + Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            {/* Left / Article Body */}
            <div>
              {/* Mobile Table of Contents */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Bookmark size={16} color="var(--green-primary)" />
                  Mục lục bài viết
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          textAlign: 'left',
                          lineHeight: 1.4,
                          transition: 'color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Content Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
                {post.contentSections.map((section) => (
                  <section key={section.id} id={section.id} style={{ scrollMarginTop: '90px' }}>
                    {section.heading && (
                      <h2 style={{
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        marginBottom: '1rem',
                        lineHeight: 1.35
                      }}>
                        {section.heading}
                      </h2>
                    )}

                    {section.paragraphs.map((p, idx) => (
                      <p key={idx} style={{
                        fontSize: '1rem',
                        lineHeight: 1.75,
                        color: 'var(--text-main)',
                        marginBottom: '1rem'
                      }}>
                        {p}
                      </p>
                    ))}

                    {/* Highlight Box if available */}
                    {section.highlightBox && (
                      <div style={{
                        backgroundColor:
                          section.highlightBox.type === 'warning' ? '#fffbeb' :
                          section.highlightBox.type === 'tip' ? '#f0fdf4' : 'var(--bg-subtle)',
                        border: `1px solid ${
                          section.highlightBox.type === 'warning' ? '#fde68a' :
                          section.highlightBox.type === 'tip' ? 'var(--green-border)' : 'var(--border)'
                        }`,
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        margin: '1.25rem 0',
                        display: 'flex',
                        gap: '0.85rem'
                      }}>
                        <div style={{ flexShrink: 0, marginTop: '2px' }}>
                          {section.highlightBox.type === 'warning' && <AlertTriangle size={20} color="#d97706" />}
                          {section.highlightBox.type === 'tip' && <Lightbulb size={20} color="var(--green-primary)" />}
                          {(!section.highlightBox.type || section.highlightBox.type === 'info') && <Info size={20} color="#0284c7" />}
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: 'var(--text-main)',
                            marginBottom: '0.35rem'
                          }}>
                            {section.highlightBox.title}
                          </h4>
                          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                            {section.highlightBox.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Blockquote if available */}
                    {section.quote && (
                      <blockquote style={{
                        borderLeft: '4px solid var(--green-primary)',
                        backgroundColor: 'var(--green-light)',
                        padding: '1.25rem 1.5rem',
                        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                        margin: '1.5rem 0',
                        fontStyle: 'italic',
                        color: 'var(--text-main)'
                      }}>
                        <p style={{ fontSize: '1.025rem', lineHeight: 1.6, marginBottom: '0.5rem', fontWeight: 500 }}>
                          "{section.quote.text}"
                        </p>
                        {section.quote.author && (
                          <footer style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                            — {section.quote.author}
                          </footer>
                        )}
                      </blockquote>
                    )}

                    {/* Data Table if available */}
                    {section.table && (
                      <div style={{
                        overflowX: 'auto',
                        margin: '1.5rem 0',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)'
                      }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: '0.875rem',
                          textAlign: 'left'
                        }}>
                          <thead>
                            <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                              {section.table.headers.map((h, i) => (
                                <th key={i} style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} style={{
                                borderBottom: rIdx === section.table!.rows.length - 1 ? 'none' : '1px solid var(--border-light)',
                                backgroundColor: rIdx % 2 === 0 ? '#ffffff' : 'var(--bg-subtle)'
                              }}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} style={{
                                    padding: '0.75rem 1rem',
                                    color: cIdx === 0 ? 'var(--text-main)' : 'var(--text-secondary)',
                                    fontWeight: cIdx === 0 || cIdx === row.length - 1 ? 600 : 400
                                  }}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Checklist if available */}
                    {section.checklist && (
                      <div style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        margin: '1.25rem 0'
                      }}>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                          {section.checklist.map((item, cIdx) => (
                            <li key={cIdx} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                              <CheckCircle2 size={18} color="var(--green-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* CRITICAL SEO REQUIREMENT: Internal Linking to Real Estate Property */}
              {relatedProperty && (
                <div style={{
                  marginTop: '3rem',
                  backgroundColor: 'var(--green-light)',
                  border: '1px solid var(--green-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--green-dark)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <Building size={16} color="var(--green-primary)" />
                    Dự Án / Bất Động Sản Liên Quan Trong Bài Viết (Internal Link)
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    {relatedProperty.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    {post.relatedPropertyNote || relatedProperty.description.slice(0, 160) + '...'}
                  </p>

                  {/* Property Mini Preview Card */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={relatedProperty.images[0]}
                        alt={relatedProperty.title}
                        style={{
                          width: '90px',
                          height: '70px',
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          marginBottom: '3px'
                        }}>
                          <MapPin size={13} color="var(--green-primary)" />
                          <span>{relatedProperty.ward}, {relatedProperty.district}, {relatedProperty.city}</span>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green-primary)' }}>
                          {relatedProperty.priceFormatted}
                          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '6px' }}>
                            ({relatedProperty.area}m²)
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProperty(relatedProperty)}
                      className="btn-primary"
                      style={{ padding: '0.65rem 1.25rem' }}
                    >
                      <span>Xem chi tiết BĐS này</span>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Tags Cloud */}
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem'
                }}>
                  <Tag size={15} />
                  Từ khóa chủ đề:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Card */}
              <div style={{
                marginTop: '2rem',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem'
              }}>
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--green-primary)'
                  }}
                />
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                    {post.author.name}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--green-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                    {post.author.role}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Sticky CTA and Newsletter */}
            <aside style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Sticky TOC */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  Điều hướng bài viết
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {post.tableOfContents.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => scrollToSection(t.id)}
                      style={{
                        textAlign: 'left',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        padding: '3px 0',
                        borderLeft: '2px solid transparent',
                        paddingLeft: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--green-primary)';
                        e.currentTarget.style.borderLeftColor = 'var(--green-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderLeftColor = 'transparent';
                      }}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Form: Báo giá & Phân tích quy hoạch */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Tư Vấn Quy Hoạch & Báo Giá
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Nhận trọn bộ tài liệu quy hoạch và danh sách 10+ căn hộ tốt nhất khu vực này.
                </p>

                {ctaSubmitted ? (
                  <div style={{
                    backgroundColor: 'var(--green-light)',
                    border: '1px solid var(--green-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: 'var(--green-dark)'
                  }}>
                    <CheckCircle2 size={24} color="var(--green-primary)" style={{ margin: '0 auto 6px' }} />
                    <div style={{ fontWeight: 700 }}>Đã tiếp nhận yêu cầu!</div>
                    <div style={{ fontSize: '0.775rem', marginTop: '4px' }}>Chuyên viên sẽ gửi tài liệu qua Zalo trong 5 phút.</div>
                  </div>
                ) : (
                  <form onSubmit={handleCtaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <input
                      type="text"
                      placeholder="Họ và tên của bạn"
                      value={ctaName}
                      onChange={(e) => setCtaName(e.target.value)}
                      required
                      style={{
                        padding: '0.55rem 0.75rem',
                        fontSize: '0.825rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại / Zalo *"
                      value={ctaPhone}
                      onChange={(e) => setCtaPhone(e.target.value)}
                      required
                      style={{
                        padding: '0.55rem 0.75rem',
                        fontSize: '0.825rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                    >
                      <Send size={14} />
                      <span>Nhận tài liệu ngay</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Hotline Box */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center'
              }}>
                <PhoneCall size={24} color="var(--green-primary)" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Cần hỗ trợ tư vấn pháp lý trực tiếp?
                </div>
                <a
                  href="tel:19006868"
                  style={{
                    display: 'block',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--green-primary)',
                    marginTop: '0.25rem'
                  }}
                >
                  1900 6868
                </a>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Miễn cước cuộc gọi • 24/7
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles Section */}
          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Bài viết liên quan & Đề xuất
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Các phân tích cùng chủ đề {post.categoryName} bạn có thể quan tâm
                </p>
              </div>

              <button
                onClick={onBack}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--green-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Xem tất cả bài viết <ExternalLink size={14} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  onClick={() => {
                    onSelectPost(related);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'var(--green-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <img
                    src={related.coverImage}
                    alt={related.imageAlt}
                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--green-primary)',
                      marginBottom: '0.35rem'
                    }}>
                      {related.categoryName}
                    </div>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: 'var(--text-main)',
                      marginBottom: '0.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {related.title}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span>{related.publishedAt}</span>
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
