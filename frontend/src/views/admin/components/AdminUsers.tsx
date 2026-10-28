import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Shield,
  Briefcase,
  User,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  X,
  Check,
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react';
import { AdminUser } from '../types';
import {
  fetchAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser
} from '../../../services/adminApi';
import { notify } from '../../../utils/toast';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleTab, setRoleTab] = useState<'all' | 'admin' | 'agent' | 'user'>('all');
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // Form create state
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPhone, setCreatePhone] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createRole, setCreateRole] = useState<'admin' | 'agent' | 'user'>('agent');
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  // Form edit state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState<'admin' | 'agent' | 'user'>('user');
  const [editStatus, setEditStatus] = useState<'active' | 'suspended'>('active');
  const [editNewPassword, setEditNewPassword] = useState('');
  const [showEditPassword, setShowEditPassword] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const res = await fetchAdminUsers({ role: roleTab, search });
    if (res.data) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [roleTab, search]);

  // Open edit modal
  const handleOpenEdit = (user: AdminUser) => {
    setEditingUser(user);
    setEditName(user.fullName || '');
    setEditEmail(user.email || '');
    setEditPhone(user.phone || '');
    setEditRole(user.role);
    setEditStatus((user.status as any) || 'active');
    setEditNewPassword('');
    setShowEditPassword(false);
  };

  const handleRoleChange = async (userId: number | string, newRole: 'admin' | 'agent' | 'user') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    await updateAdminUser(userId, { role: newRole });
    const roleLabels = { admin: 'Quản trị viên', agent: 'Môi giới', user: 'Khách hàng' };
    notify.info(`Đã cập nhật vai trò thành viên thành: ${roleLabels[newRole]}`);
  };

  const handleStatusToggle = async (userId: number | string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus as any } : u));
    await updateAdminUser(userId, { status: nextStatus as any });
    if (nextStatus === 'active') {
      notify.success('Đã kích hoạt lại tài khoản thành công!');
    } else {
      notify.warning('Đã tạm khóa hoạt động tài khoản!');
    }
  };

  const handleDelete = async (userId: number | string, name: string) => {
    if (window.confirm(`Xác nhận xóa tài khoản "${name}" khỏi hệ thống?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      await deleteAdminUser(userId);
      notify.success(`Đã xóa tài khoản "${name}" khỏi hệ thống!`);
    }
  };

  // Submit Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName || !createEmail) return;

    if (!createPassword || createPassword.length < 6) {
      notify.warning('Vui lòng nhập mật khẩu tối thiểu 6 ký tự');
      return;
    }

    const res = await createAdminUser({
      fullName: createName,
      email: createEmail,
      phone: createPhone,
      password: createPassword,
      role: createRole,
      status: 'active'
    });

    if (res.data) {
      setUsers(prev => [res.data!, ...prev]);
      notify.success(`Đã tạo tài khoản "${createName}" thành công!`);
    }
    setIsCreateModalOpen(false);
    setCreateName('');
    setCreateEmail('');
    setCreatePhone('');
    setCreatePassword('');
  };

  // Submit Edit User
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editName || !editEmail) return;

    const payload: Partial<AdminUser> & { password?: string } = {
      fullName: editName,
      email: editEmail,
      phone: editPhone,
      role: editRole,
      status: editStatus
    };

    if (editNewPassword.trim()) {
      if (editNewPassword.trim().length < 6) {
        notify.warning('Mật khẩu mới phải có tối thiểu 6 ký tự');
        return;
      }
      payload.password = editNewPassword.trim();
    }

    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...payload } : u));
    await updateAdminUser(editingUser.id, payload);
    notify.success(`Đã cập nhật thông tin tài khoản "${editName}" thành công!`);
    setEditingUser(null);
  };

  const counts = {
    all: users.length,
    agent: users.filter(u => u.role === 'agent').length,
    admin: users.filter(u => u.role === 'admin').length,
    user: users.filter(u => u.role === 'user').length
  };

  // Fix: Thay đổi button màu đen thành màu xanh emerald chuẩn theme #059669
  const roleTabItems = [
    { key: 'all' as const, label: 'Tất cả', count: counts.all, color: '#059669', icon: null },
    { key: 'agent' as const, label: 'Môi giới', count: counts.agent, color: '#059669', icon: Briefcase },
    { key: 'admin' as const, label: 'Quản trị viên', count: counts.admin, color: '#4f46e5', icon: Shield },
    { key: 'user' as const, label: 'Khách hàng', count: counts.user, color: '#0284c7', icon: User }
  ];

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '4px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '0.825rem',
    backgroundColor: '#ffffff',
    color: '#0f172a'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Filter Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '0.85rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        {/* Role Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {roleTabItems.map(tab => {
            const isActive = roleTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setRoleTab(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: isActive ? tab.color : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  transition: 'all 0.15s ease'
                }}
              >
                {Icon && <Icon size={14} />}
                <span>{tab.label}</span>
                <span style={{
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  fontSize: '0.675rem',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên, email, SĐT..."
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              outline: 'none',
              width: '180px'
            }}
          />
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
            }}
          >
            <Plus size={16} />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* 2. Main Users Table */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
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
                <th style={{ padding: '12px 14px' }}>Thành viên</th>
                <th style={{ padding: '12px 14px' }}>Vai trò / Quyền hạn</th>
                <th style={{ padding: '12px 14px' }}>Số điện thoại</th>
                <th style={{ padding: '12px 14px' }}>Trạng thái</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    Đang tải danh sách người dùng...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    Không tìm thấy tài khoản nào khớp với bộ lọc.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fafafa'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {/* User Profile */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                          alt=""
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{u.fullName}</div>
                          <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Dropdown */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: u.role === 'admin' ? '1px solid #c7d2fe' : u.role === 'agent' ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                          backgroundColor: u.role === 'admin' ? '#eef2ff' : u.role === 'agent' ? '#ecfdf5' : '#f8fafc',
                          color: u.role === 'admin' ? '#4338ca' : u.role === 'agent' ? '#065f46' : '#334155',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="admin">Quản trị viên (Admin)</option>
                        <option value="agent">Môi giới / Chuyên viên</option>
                        <option value="user">Khách hàng / Thành viên</option>
                      </select>
                    </td>

                    {/* Phone */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: '#334155', fontWeight: 600 }}>
                      {u.phone || 'Chưa cập nhật'}
                    </td>

                    {/* Status Badge & Toggle */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={() => handleStatusToggle(u.id, u.status || 'active')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 9px',
                          borderRadius: '9999px',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          border: u.status === 'active' ? '1px solid #a7f3d0' : '1px solid #fecdd3',
                          backgroundColor: u.status === 'active' ? '#ecfdf5' : '#fef2f2',
                          color: u.status === 'active' ? '#065f46' : '#dc2626',
                          cursor: 'pointer'
                        }}
                        title="Bấm để Đổi trạng thái Kích hoạt / Khóa"
                      >
                        {u.status === 'active' ? (
                          <>
                            <CheckCircle size={12} color="#059669" />
                            <span>Đang hoạt động</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} color="#dc2626" />
                            <span>Đang tạm khóa</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td style={{ padding: '12px 14px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {/* Nút Sửa tài khoản */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(u)}
                          title="Chỉnh sửa thông tin tài khoản"
                          style={{
                            padding: '5px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#059669',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={15} />
                        </button>

                        {/* Nút Xóa tài khoản */}
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id, u.fullName)}
                          title="Xóa tài khoản"
                          style={{
                            padding: '5px',
                            borderRadius: '6px',
                            border: '1px solid #fecdd3',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Modal Thêm tài khoản mới (Bắt buộc nhập mật khẩu) */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '460px',
              width: '100%',
              overflow: 'hidden',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="#059669" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Thêm tài khoản mới
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={labelStyle}>Họ và tên *</label>
                <input
                  required
                  type="text"
                  placeholder="VD: Trần Hoàng Long"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email đăng nhập *</label>
                <input
                  required
                  type="email"
                  placeholder="VD: hoanglong.agent@batdongsan.vn"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Số điện thoại</label>
                <input
                  type="text"
                  placeholder="VD: 0988 123 456"
                  value={createPhone}
                  onChange={(e) => setCreatePhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Password Input Required */}
              <div>
                <label style={labelStyle}>Mật khẩu đăng nhập *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type={showCreatePassword ? 'text' : 'password'}
                    placeholder="Tối thiểu 6 ký tự"
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: '36px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showCreatePassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Vai trò & Phân quyền</label>
                <select
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value as any)}
                  style={inputStyle}
                >
                  <option value="agent">Môi giới / Chuyên viên tư vấn</option>
                  <option value="admin">Quản trị viên (Admin)</option>
                  <option value="user">Khách hàng thông thường</option>
                </select>
              </div>

              <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '7px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#059669', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={14} />
                  <span>Tạo tài khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal Chỉnh sửa tài khoản */}
      {editingUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setEditingUser(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '460px',
              width: '100%',
              overflow: 'hidden',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="#059669" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Chỉnh sửa tài khoản
                </h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={labelStyle}>Họ và tên *</label>
                <input
                  required
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email đăng nhập *</label>
                <input
                  required
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Số điện thoại</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Vai trò</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as any)}
                    style={inputStyle}
                  >
                    <option value="admin">Quản trị viên (Admin)</option>
                    <option value="agent">Môi giới / Chuyên viên</option>
                    <option value="user">Khách hàng thông thường</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Trạng thái</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    style={inputStyle}
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="suspended">Tạm khóa</option>
                  </select>
                </div>
              </div>

              {/* Reset Password Field */}
              <div style={{
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <KeyRound size={14} color="#059669" />
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Đổi mật khẩu mới (Tùy chọn)</label>
                </div>
                <div style={{ position: 'relative', marginTop: '4px' }}>
                  <input
                    type={showEditPassword ? 'text' : 'password'}
                    placeholder="Để trống nếu giữ nguyên mật khẩu cũ"
                    value={editNewPassword}
                    onChange={(e) => setEditNewPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: '36px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPassword(!showEditPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showEditPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '7px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#059669', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={14} />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
