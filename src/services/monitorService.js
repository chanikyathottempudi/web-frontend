import api from './api';

const monitorService = {
  getRealTimeStream: async (patientId, limit = 20) => {
    const response = await api.get('/realtimemonitor/stream/', {
      params: { patient_id: patientId, limit }
    });
    return response.data;
  },

  getAllActiveStreams: async () => {
    const response = await api.get('/realtimemonitor/stream/');
    return response.data;
  }
};

export default monitorService;
