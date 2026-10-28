export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return re.test(phone.replace(/\s+/g, ''));
}

export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 6) {
    return { isValid: false, message: 'Mật khẩu phải chứa ít nhất 6 ký tự' };
  }
  return { isValid: true };
}
