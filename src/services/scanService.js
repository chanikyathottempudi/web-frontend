import api from './api';

const scanService = {
  registerScan: async (scanData) => {
    try {
      const response = await api.post('/dicom/register-scan/', scanData);
      return response.data;
    } catch (error) {
      console.error("Error registering scan:", error);
      throw error;
    }
  },

  getScanRegistrations: async () => {
    try {
      const response = await api.get('/dicom/register-scan/');
      return response.data;
    } catch (error) {
      console.error("Error fetching scan registrations:", error);
      throw error;
    }
  }
};

export default scanService;
