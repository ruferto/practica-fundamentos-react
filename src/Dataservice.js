
import storage from '../src/utils/storage.js';


const BASE_URL=`http://127.0.0.1:3001`;
const TOKEN_KEY = 'token';



//const client = axios.create({ baseURL: BASE_URL });

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    getStringQueries: () => {
        const params = new URLSearchParams(document.location.search.substring(1));
        const nombre = params.get("nombre");
        const min = params.get("min");
        const max = params.get("max");
        const venta = params.get("venta");
        const tags = params.get("tags");
        const id = params.get("id");
        const page = params.get("page") || 1;
        const limit = params.get("limit") || 10;
        const sort = params.get("sort");
        const order = params.get("order");
        const next = params.get("next");
        const message = params.get("mensaje");
        return {
            id,
            nombre,
            min,
            max,
            venta,
            tags,
            page,
            limit,
            sort,
            order,
            next,
            message
        };
    },

    getAds: async function(queries) {

        const config = {
            method: 'GET',
            headers: {},
            body: null

        };
        const token = (storage.get(TOKEN_KEY))//.replace('"','').replace('"','');
        console.log(token)
        config.headers['Authorization'] = `Bearer ${token}`;//${token}`;

        // }

        let price='';
        if(queries.precio){
            console.log(queries.precio)
            const aux = queries.precio;
            
                price += `&price=${aux[0]}&price=${aux[1]}`;
          
        }
        
        const caca = `${ (queries.nombre ? `&name=%${queries.nombre}%` : ``)}${ (queries.venta ? `&sale=${queries.venta}`: ``)}${ (queries.tags ? `&tags=${queries.tags}`: ``)}${ (queries.precio ? `${price}`: ``)}`;
        const queryString = caca.replace('&','?')

        const response = await fetch(`${BASE_URL}/api/v1/adverts/${queryString}`, config);
        if (response.ok) {
            
            let data = response.json();
            
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    getTotalPages: async function(queries) {
        //const queries = this.getStringQueries();
        const config = {
            method: 'GET',
            headers: {},
            body: null

        };
        const token = storage.get(TOKEN_KEY);
        config.headers['Authorization'] = `Bearer ${token}`;//${token}`;

        const queryString = `${ (queries.nombre ? `name=${queries.nombre}`: ``)}${ (queries.min ? `&price=${queries.precio}`: ``)}${ (queries.venta ? `&sale=${queries.venta}`: ``)}${ (queries.tags ? `&tags=${queries.tags}`: ``)}`;
        console.log(queryString)
        const response = await fetch(`${BASE_URL}/api/v1/adverts/?${queryString}`, config);
        if (response.ok) {
            let data = await response.json();
            return Math.ceil(data.length/queries.limit);
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    getAd: async (id) => {
        const config = {
            method: 'GET',
            headers: {},
            body: null

        };
        const token = storage.get(TOKEN_KEY);
        config.headers['Authorization'] = `Bearer ${token}`;//${token}`;

        const response = await fetch(`${BASE_URL}/api/v1/adverts/${id}`, config);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function(url, postData, json=true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url) {
        return await this.request('DELETE', url, {});
    },

    edit: async function(url, postdata, json=true) {
        return await this.request('PUT', url, postdata, json);
    },

    put: async function(url, putData, json=true) {
        return await this.request('PUT', url, putData, json);
    },

    request: async function(method, url, postData, json=true) {
        const config = {
            method: method,
            headers: {},
            body: null
        };
        if(json){
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);
        } else {
            config.body = postData;
        }
        // const token = await this.getToken();
        // if (token) {
            config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWIyZmZkYi01Njg4LTRiMTctYTc4OS05MGMwNTg3MmI1NGUiLCJpYXQiOjE2MTY1NDI5MDYsImV4cCI6MTYxNjYyOTMwNn0.aGu9I_O5R7wVlDNhNUHUMOC0YHl0uLsHQvlx1bscrD4`;//${token}`;
        // }
        const response = await fetch(url, config);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {            
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function(user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function(creds) {
        const config = {
            method: 'POST',
            headers: {},
            body: null

        };
        const token = storage.get(TOKEN_KEY);
        config.headers['Authorization'] = `Bearer ${token}`;

        const url = `${BASE_URL}/api/auth/login`;
        return await this.post(url, creds);
    },

    logout: async function() {
        localStorage.removeItem(TOKEN_KEY);
    },

    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function() {
        const token = await this.getToken();    
        return token !== null;
    },

    saveAd: async function(ad) {

        const config = {
            method: 'POST',
            headers: {},
            body: null

        };
        const token = storage.get(TOKEN_KEY);
        config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(ad);
        config.headers['Authorization'] = `Bearer ${token}`;//${token}`;
console.log(ad)
        const url = `${BASE_URL}/api/v1/adverts`;

        ad.name = ad.name.replace(/(<([^>]+)>)/gi,'');
        //ad.tags = ad.tags.map( tag => tag.replace(/(<([^>]+)>)/gi, ''));
        // if (ad.photo) {
        //     const imageURL = await this.uploadImage(ad.foto);
        //     ad.foto = imageURL;
        // }
        
        //return await this.post(url, ad);
        const response = await fetch(url, config);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {            
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    deleteAdvert: async function(id) {

        const config = {
            method: 'DELETE',
            headers: {},
            body: null

        };
        const token = storage.get(TOKEN_KEY);
        config.headers['Content-Type'] = 'application/json';
            // config.body = JSON.stringify(id);
        config.headers['Authorization'] = `Bearer ${token}`;//${token}`;
console.log(id)
        const url = `${BASE_URL}/api/v1/adverts/${id}`;

        const response = await fetch(url, config);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {            
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    uploadImage: async function(image) {
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        return response.path || null;
    },

    getUserDetails: async function() {
        try{
            const payloadBase64 = localStorage.getItem(TOKEN_KEY).split('.')[1];
            var jsonPayload = atob(payloadBase64);
            const {username, userId} = JSON.parse(jsonPayload);
            return {username, userId};
        }catch(error){
            return null;
        }
    },

    getUsername: async function(id) {
        const response = await fetch(`${BASE_URL}/api/users/?id=${id}`);
        if (response.ok) {
            let data = await response.json();
            return data[0].username;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    deleteAd: async function(ad) {
        const url = `${BASE_URL}/api/anuncios/${ad.id}`;
        return await this.delete(url);
    },

    editAd: async function(ad) {
        ad.nombre = ad.nombre.replace(/(<([^>]+)>)/gi, '');
        ad.tags = ad.tags.map( tag => tag.replace(/(<([^>]+)>)/gi, ''));
        if (ad.foto && (typeof ad.foto !== 'string')) {
            const imageURL = await this.uploadImage(ad.foto);
            ad.foto = imageURL;
        }
        const url = `${BASE_URL}/api/anuncios/${ad.id}`;
        return await this.edit(url, ad);
    },

    getTagsList: async function(queries) {
        const ads = await this.getAds(queries);
        const tagList= [];
        ads.forEach( ad => {
            ad.tags.forEach( tag => {
                if(!tagList.includes(tag))
                    tagList.push(tag);
            });
        });
        return tagList;
    },

    getTags: async function() {

        const config = {
            method: 'GET',
            headers: {},
            body: null

        };
        const token = storage.get(TOKEN_KEY);
        config.headers['Authorization'] = `Bearer ${token}`;//${token}`;
        const response = await fetch(`${BASE_URL}/api/v1/adverts/tags`, config);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    saveAdvert: async function(data, callback) {
        const XHR = new XMLHttpRequest(),
        FD  = new FormData();

  //Push our data into our FormData object
        for( const item in data ) {
            FD.append( item, data[ item ] );
        }
// FD.append('name', data.name);
// FD.append('sale', data.sale);
// FD.append('price', data.price);
// FD.append('tags', data.tags);

  // Define what happens on successful data submission
//  XHR.addEventListener( 'load', ( event ) => {
//     // alert( 'Yeah! Data sent and response loaded.' );
//     const newAd = XHR.response
//     console.log(newAd)
//     return newAd

//   } );
  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4) {
      callback(XHR.response);
    }
  }

//   // Define what happens in case of error
//   XHR.addEventListener(' error', function( event ) {
//     alert( 'Oops! Something went wrong.' );
//   } );

  // Set up our request
        XHR.open( 'POST', `${BASE_URL}/api/v1/adverts` );
        XHR.responseType = 'json'
        const token = storage.get('auth');

        XHR.setRequestHeader('Authorization', `Bearer  ${token.replace('"','').replace('"','')}` );

  // Send our FormData object; HTTP headers are set automatically
        XHR.send( FD );
        ///return XHR.responseText
        
    }
};