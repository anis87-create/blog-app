export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'reader' | 'author' | 'admin';
  provider: 'local' | 'google' | 'facebook';
  isVerified: boolean;
  createdAt: string;
}
