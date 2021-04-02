import client from './client';
// import storage from '../utils/storage'

const advertsBaseUrl = '/api/v1';

export const getLatestAdverts = () => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.get(url);
};

export const getAdvertDetail = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, advert);
};

export const deleteAdvert = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
}

// export const saveAdvert = async (data, callback) => {
//   const XHR = new XMLHttpRequest(),
//   FD  = new FormData();

//   for( const item in data ) {
//       FD.append( item, data[ item ] );
//   }

//   XHR.onreadystatechange = function() {
//     if (XHR.readyState === 4) {
//       callback(XHR.response);
//     }
//   }

//   XHR.open( 'POST', `http://localhost:3001/api/v1/adverts` );
//   XHR.responseType = 'json'
//   const token = storage.get('auth');

//   XHR.setRequestHeader('Authorization', `Bearer  ${token.replace('"','').replace('"','')}` );
//   XHR.send( FD );
  
// }

export const saveAd = advert => {

  const FD  = new FormData();

  for( const item in advert ) {
      FD.append( item, advert[ item ] );
  }

  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, FD);
}