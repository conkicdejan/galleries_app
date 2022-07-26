import HttpService from './HttpService';

class AuthService extends HttpService {
  register = async (newUser) => {
    const { data } = await this.client.post('/register', newUser);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post('/login', credentials);
    return data;
  };

  logout = async () => {
    const { data } = await this.client.post('/logout');
    return data;
  };

  getActiveUser = async () => {
    const { data } = await this.client.get('/profile');
    return data;
  };
}

export default new AuthService();
