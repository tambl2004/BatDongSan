import React from 'react';
import { CheckCircle } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const usersList = [
    {
      id: 1,
      name: 'Nguyễn Văn Tuấn',
      email: 'admin@gmail.com',
      role: 'Quản trị viên (Admin)',
      phone: '0908 123 456',
      status: 'active',
      propertiesCount: 12,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      name: 'Trần Thị Thu Hà',
      email: 'ha.tran@bds-luxury.vn',
      role: 'Chuyên viên BĐS Triệu Đô',
      phone: '0912 345 678',
      status: 'active',
      propertiesCount: 8,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      email: 'nam.le@bds-vietnam.vn',
      role: 'Chuyên viên Cho thuê',
      phone: '0988 765 432',
      status: 'active',
      propertiesCount: 6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 4,
      name: 'Nguyễn Văn Tâm',
      email: 'tam@gmail.com',
      role: 'Khách hàng / Thành viên',
      phone: '0912 345 678',
      status: 'active',
      propertiesCount: 1,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Danh sách Người dùng & Chuyên viên Môi giới
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Quản lý phân quyền tài khoản, chuyên viên tư vấn và khách hàng trên hệ thống
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-primary)', backgroundColor: 'var(--green-light)', padding: '3px 10px', borderRadius: 'var(--radius-pill)' }}>
            4 tài khoản đang hoạt động
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Thành viên</th>
                <th style={{ padding: '0.85rem 1rem' }}>Vai trò / Phân quyền</th>
                <th style={{ padding: '0.85rem 1rem' }}>Liên hệ</th>
                <th style={{ padding: '0.85rem 1rem' }}>Số tin BĐS</th>
                <th style={{ padding: '0.85rem 1rem' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={u.avatar}
                        alt=""
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: u.role.includes('Admin') ? 'var(--green-light)' : 'var(--bg-subtle)',
                      color: u.role.includes('Admin') ? 'var(--green-dark)' : 'var(--text-secondary)',
                      border: u.role.includes('Admin') ? '1px solid var(--green-border)' : '1px solid var(--border)'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.825rem' }}>{u.phone}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {u.propertiesCount} BĐS
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#059669'
                    }}>
                      <CheckCircle size={13} />
                      <span>Đang kích hoạt</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
