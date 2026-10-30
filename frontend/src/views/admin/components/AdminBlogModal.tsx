import React, { useState, useEffect } from 'react';
import { X, BookOpen, Plus, Trash2 } from 'lucide-react';
import { BlogPost, BlogCategory } from '../../../types/blog';
import { notify } from '../../../utils/toast';

interface AdminBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (postData: Partial<BlogPost>) => void;
  editingPost?: BlogPost | null;
}

const SAMPLE_COVERS = [
  { label: 'Thị trường & Cao ốc', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Biệt thự sang trọng', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Pháp lý & Hợp đồng', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tiến độ hạ tầng', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Căn hộ nội thất Ý', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' }
];

export const AdminBlogModal: React.FC<AdminBlogModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPost
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BlogCategory>('thi-truong');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [authorName, setAuthorName] = useState('Ban Biên Tập GreenNest');
  const [authorRole, setAuthorRole] = useState('Chuyên gia BĐS & Pháp lý');
  const [readTime, setReadTime] = useState('5 phút đọc');
  const [tagsInput, setTagsInput] = useState('Thị trường BĐS, Pháp lý nhà đất');
  const [featured, setFeatured] = useState(false);
  const [popular, setPopular] = useState(false);
  const [sections, setSections] = useState<{ heading: string; text: string }[]>([
    { heading: '1. Bối cảnh và diễn biến thực tế', text: '' },
    { heading: '2. Quy định pháp luật & Lời khuyên an toàn', text: '' }
  ]);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setCategory(editingPost.category);
      setExcerpt(editingPost.excerpt);
      setCoverImage(editingPost.coverImage);
      setAuthorName(editingPost.author.name);
      setAuthorRole(editingPost.author.role);
      setReadTime(editingPost.readTime);
      setTagsInput(editingPost.tags ? editingPost.tags.join(', ') : '');
      setFeatured(!!editingPost.featured);
      setPopular(!!editingPost.popular);

      if (editingPost.contentSections && editingPost.contentSections.length > 0) {
        setSections(
          editingPost.contentSections.map(s => ({
            heading: s.heading || '',
            text: s.paragraphs ? s.paragraphs.join('\n\n') : ''
          }))
        );
      } else {
        setSections([{ heading: '1. Nội dung bài viết', text: editingPost.excerpt }]);
      }
    } else {
      // Reset form
      setTitle('');
      setCategory('thi-truong');
      setExcerpt('');
      setCoverImage(SAMPLE_COVERS[0].url);
      setAuthorName('Ban Biên Tập GreenNest');
      setAuthorRole('Chuyên gia BĐS & Pháp lý');
      setReadTime('5 phút đọc');
      setTagsInput('Thị trường BĐS, Pháp lý nhà đất');
      setFeatured(false);
      setPopular(false);
      setSections([
        { heading: '1. Bối cảnh và diễn biến thực tế', text: '' },
        { heading: '2. Quy định pháp luật & Lời khuyên chuyên gia', text: '' }
      ]);
    }
  }, [editingPost, isOpen]);

  if (!isOpen) return null;

  const handleAddSection = () => {
    setSections(prev => [
      ...prev,
      { heading: `${prev.length + 1}. Tiêu đề mục nội dung`, text: '' }
    ]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length <= 1) {
      notify.warning('Bài viết cần có ít nhất 1 mục nội dung');
      return;
    }
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index: number, field: 'heading' | 'text', value: string) => {
    setSections(prev =>
      prev.map((sec, i) => (i === index ? { ...sec, [field]: value } : sec))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      notify.warning('Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!excerpt.trim()) {
      notify.warning('Vui lòng nhập tóm tắt nội dung bài viết');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const contentSections = sections.map((sec, idx) => ({
      id: `section-${idx + 1}`,
      heading: sec.heading.trim(),
      paragraphs: sec.text
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0)
    }));

    const tableOfContents = sections.map((sec, idx) => ({
      id: `section-${idx + 1}`,
      title: sec.heading.trim() || `Mục ${idx + 1}`,
      level: 2
    }));

    onSave({
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      coverImage: coverImage.trim() || SAMPLE_COVERS[0].url,
      imageAlt: title.trim(),
      readTime,
      tags,
      featured,
      popular,
      author: {
        name: authorName.trim() || 'Ban Biên Tập GreenNest',
        role: authorRole.trim() || 'Chuyên gia BĐS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        bio: 'Đội ngũ chuyên viên nghiên cứu thị trường và pháp lý.'
      },
      contentSections,
      tableOfContents,
      seo: {
        title: `${title.trim()} | GreenNest`,
        metaDescription: excerpt.trim(),
        keywords: tags
      }
    });

    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.25rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '820px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {editingPost ? 'Chỉnh Sửa Bài Viết' : 'Đăng Tải Bài Viết Tin Tức & Pháp Luật'}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Chia sẻ cẩm nang, diễn biến thị trường, kinh nghiệm mua bán và quy định pháp lý BĐS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#94a3b8'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Tiêu đề */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
              Tiêu đề bài viết *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Cập nhật Luật Đất Đai mới: Những quy định bắt buộc người mua cần biết..."
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Row: Chuyên mục & Thời gian đọc */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Chuyên mục bài viết *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  outline: 'none'
                }}
              >
                <option value="thi-truong">📈 Tin thị trường & Quy hoạch hạ tầng</option>
                <option value="du-an">🏗️ Tiến độ & Đánh giá dự án BĐS</option>
                <option value="tai-chinh">⚖️ Pháp luật, Thủ tục & Tài chính nhà đất</option>
                <option value="phong-thuy">🏡 Mẹo phong thủy, Kiến trúc & Nội thất</option>
                <option value="cau-chuyen">💡 Kinh nghiệm mua bán & Đầu tư thực tế</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Thời gian đọc
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="VD: 5 phút đọc"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Tóm tắt */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
              Tóm tắt bài viết (Excerpt) *
            </label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Mô tả ngắn gọn nội dung cốt lõi của bài viết (hiển thị trên thẻ danh sách và thẻ SEO)..."
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Ảnh bìa */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
              Ảnh bìa bài viết (URL)
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>
            {/* Gợi ý ảnh nhanh */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Chọn nhanh ảnh mẫu:</span>
              {SAMPLE_COVERS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCoverImage(sample.url)}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    border: coverImage === sample.url ? '1px solid #059669' : '1px solid #cbd5e1',
                    backgroundColor: coverImage === sample.url ? '#ecfdf5' : '#f1f5f9',
                    color: coverImage === sample.url ? '#059669' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tác giả & Tags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Tác giả bài viết
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Tên tác giả"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Thẻ từ khóa (Tags)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Phân cách bằng dấu phẩy, VD: Pháp lý, Sổ đỏ"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Nội dung chi tiết các phần */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                Nội dung chi tiết bài viết ({sections.length} phần)
              </label>
              <button
                type="button"
                onClick={handleAddSection}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #059669',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Plus size={13} />
                <span>Thêm mục nội dung</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    padding: '10px 12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                      placeholder={`Tiêu đề mục ${idx + 1}...`}
                      style={{
                        flex: 1,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        padding: '6px 8px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        backgroundColor: '#ffffff'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      title="Xóa mục này"
                      style={{
                        marginLeft: '8px',
                        border: 'none',
                        background: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={sec.text}
                    onChange={(e) => handleSectionChange(idx, 'text', e.target.value)}
                    placeholder="Nhập nội dung các đoạn văn bản cho mục này (xuống dòng để tách đoạn)..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.825rem',
                      color: '#334155',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tùy chọn ghim VIP */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#059669' }}
              />
              <span>⭐ Ghim làm bài viết nổi bật trang chủ (Featured)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              <input
                type="checkbox"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#059669' }}
              />
              <span>🔥 Đánh dấu bài viết đọc nhiều (Popular)</span>
            </label>
          </div>

          {/* Footer Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 22px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)'
              }}
            >
              {editingPost ? 'Lưu thay đổi bài viết' : 'Đăng tải bài viết ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogModal;
