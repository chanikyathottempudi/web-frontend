import api from './api';

const dosestatsService = {
  getDashboardStats: async () => {
    const response = await api.get('/dosestats/dashboard/');
    return response.data;
  },

  getScanStats: async (patientId) => {
    const response = await api.get('/dosestats/scans/dose_statistics/', { params: { patient_id: patientId } });
    return response.data;
  },

  getMonthlyTrend: async (patientId) => {
    const response = await api.get('/dosestats/scans/monthly_trend/', { params: { patient_id: patientId } });
    return response.data;
  }
};

export default dosestatsService;
