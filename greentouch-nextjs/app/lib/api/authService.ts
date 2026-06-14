import axios from './axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/auth/logout');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const getCurrentUser = async (): Promise<AuthResponse['user']> => {
  const response = await axios.get('/auth/me');
  return response.data.user;
};

export const updateProfile = async (data: Partial<RegisterData>): Promise<AuthResponse['user']> => {
  const response = await axios.put('/auth/profile', data);
  return response.data.user;
};

export const changePassword = async (
  data: { currentPassword: string; newPassword: string }
): Promise<void> => {
  await axios.post('/auth/change-password', data);
}; 