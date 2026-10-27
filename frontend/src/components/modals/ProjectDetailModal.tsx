import React from 'react';
import { X, MapPin, Phone, ArrowRight } from 'lucide-react';

export interface ProjectData {
  name: string;
  developer: string;
  location: string;
  scale: string;
  priceFrom: string;
  type: string;
  img: string;
  features: string[];
  status: string;
  description?: string;
  products?: { type: string; area: string; price: string }[];
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onConsult: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onConsult
}) => {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
          <img
            src={project.img}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            backgroundColor: 'var(--green-primary)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            {project.type}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 800
          }}>
            {project.priceFrom}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--green-primary)', fontWeight: 700, marginBottom: '2px' }}>
            Chủ đầu tư: {project.developer}
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            {project.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <MapPin size={15} color="var(--green-primary)" />
            <span>{project.location}</span>
          </div>

          {/* Quick Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tổng quy mô</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {project.scale.split('-')[0]}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tình trạng</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--green-primary)' }}>
                {project.status.split('&')[0]}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pháp lý</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Sở hữu lâu dài
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem' }}>
              Tiện ích đặc quyền tiêu biểu
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.features.map((feat, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: 'var(--green-light)',
                    color: 'var(--green-dark)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid var(--green-border)'
                  }}
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {project.description ||
              `Dự án ${project.name} do ${project.developer} phát triển, sở hữu vị trí chiến lược kết nối giao thông hoàn hảo. Quy hoạch đồng bộ với hệ thống trường học quốc tế, bệnh viện đa khoa, trung tâm thương mại và công viên cảnh quan quy mô lớn, mang đến chuẩn sống nghỉ dưỡng và tiềm năng sinh lời dài hạn.`
            }
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                onConsult(project.name);
                onClose();
              }}
              className="btn-primary"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <span>Nhận Bảng Giá & Đặt Lịch Xem Nhà Mẫu</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="tel:19006868"
              className="btn-secondary"
              style={{ padding: '0.75rem 1rem' }}
            >
              <Phone size={16} />
              <span>1900 6868</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
