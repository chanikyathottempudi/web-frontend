import api from './api';

const aiService = {
  predictDose: async (params) => {
    const response = await api.post('/dosestats/scans/predict_dose/', params);
    return response.data;
  },

  detectAnomalies: async (patientId) => {
    const response = await api.post('/dosestats/scans/detect_anomalies/', { patient_id: patientId });
    return response.data;
  },

  getRiskByPatient: async (patientId) => {
    const response = await api.get(`/airisk/assessments/by_patient/?patient_id=${patientId}`);
    return response.data;
  },

  calculateRisk: async (patientId) => {
    const response = await api.post('/airisk/assessments/calculate_risk/', { patient_id: patientId });
    return response.data;
  }
};

export default aiService;
