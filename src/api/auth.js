import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

export const login = credentials => {
  const {email, password, wantsToBeRemembered} = credentials;
  const creds = {
    email,
    password
  }
  return client.post('/api/auth/login', creds).then(({ accessToken }) => {
    configureClient( {accessToken} );
    if(wantsToBeRemembered)
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
