export const validator = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  password: (password: string): boolean => {
    return password.length > 6;
  },
};
