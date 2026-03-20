import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/doctor/login/', { username: email, password });
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/admincenter/signup/', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  },

  forgotPassword: async (email) => {
    const response = await api.post('/doctor/forgot-password/', { email });
    return response.data;
  }
};

export default authService;
