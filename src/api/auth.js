import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

export const login = credentials => {
  return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
    configureClient( {accessToken} );
    storage.set('auth', accessToken);
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    resetClient();
    console.log('adiossssss')
    storage.remove('auth');
  });
};
