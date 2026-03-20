import api from './api';

const patientService = {
  getPatients: async () => {
    const response = await api.get('/patients/patients/');
    return response.data;
  },

  getPatientDetail: async (id) => {
    const response = await api.get(`/patients/patients/${id}/`);
    return response.data;
  },

  registerPatient: async (patientData) => {
    const response = await api.post('/patients/patients/', patientData);
    return response.data;
  },

  getRecentDoses: async (id) => {
    const response = await api.get(`/patients/patients/${id}/recent_doses/`);
    return response.data;
  },

  getActiveAlertsCount: async () => {
    const response = await api.get('/patients/alerts/active_count/');
    return response.data;
  }
};

export default patientService;
