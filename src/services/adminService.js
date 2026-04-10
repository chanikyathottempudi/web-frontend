import api from './api';

const adminService = {
  getUsers: async (params = {}) => {
    const response = await api.get('/admincenter/users/', { params });
    return response.data;
  },

  getSystemLogs: async (params = {}) => {
    const response = await api.get('/admincenter/logs/', { params });
    return response.data;
  },

  getMachines: async () => {
    const response = await api.get('/admincenter/machines/');
    return response.data;
  },

  getComplianceReports: async () => {
    const response = await api.get('/admincenter/reports/');
    return response.data;
  }
};

export default adminService;
