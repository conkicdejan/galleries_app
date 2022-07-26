import HttpService from './HttpService';
class GalleryService extends HttpService {
  getAll = async (payload) => {
    let params = [];
    for (const param in payload) {
      if (payload[param]) {
        params.push(`${param}=${payload[param]}`);
      }
    }
    const { data } = await this.client.get(`galleries?${params.join('&')}`);
    return data;
  };

  getById = async (id) => {
    const { data } = await this.client.get(`/galleries/${id}`);
    return data;
  };

  create = async (payload) => {
    const { data } = await this.client.post(`/galleries`, payload);
    return data;
  };

  edit = async (id, payload) => {
    const { data } = await this.client.put(`/galleries/${id}`, payload);
    return data;
  };

  delete = async (id) => {
    const { data } = await this.client.delete(`/galleries/${id}`);
    return data;
  };
}

export default new GalleryService();
