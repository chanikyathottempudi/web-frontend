import api from './api';

const aiService = {
  predictDose: async (params) => {
    const response = await api.post('/dosestats/scans/predict_dose/', params);
    return response.data;
  },

  detectAnomalies: async (patientId) => {
    const response = await api.post('/dosestats/scans/detect_anomalies/', { patient_id: patientId });
    return response.data;
  }
};

export default aiService;
