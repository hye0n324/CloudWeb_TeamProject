export const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  // 최소 8자, 영문, 숫자, 특수문자 포함
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

export const validateConfirmPassword = (password: string, confirm: string) => {
  return password === confirm && password !== "";
};

export const isRequired = (value: string) => {
  return value.trim().length > 0;
};

export const validatePhone = (phone: string) => {
  // 010-1234-5678 형식 (하이픈 포함)
  const re = /^010-\d{3,4}-\d{4}$/;
  return re.test(phone);
};

export const formatPhone = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
