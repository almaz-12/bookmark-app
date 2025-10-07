export const validator = {
  text: (value: string): boolean => {
    return value.length != 0;
  },
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  password: (password: string): boolean => {
    return password.length > 6;
  },
};
