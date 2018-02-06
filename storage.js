import localforage from 'localforage';
let STORAGE = {}; //global

//cannot initialize on server - must wait til called by browser
STORAGE.init = () => {
    return new Promise(function(resolve, reject) {
    if (!STORAGE.instance) {
      console.log('initalizing storage...');
      STORAGE.instance = localforage.createInstance({name: "DB"});
    }
    resolve();
    });//end promise
}


STORAGE.setStore = (store)=> {
  return new Promise(function(resolve, reject) {
    STORAGE.instance.setItem("store", store)
     .then(() => {
        return resolve();
     })
     .catch(err => {
        console.log('STORAGE ERR: ', err);
        reject(err.message);
     })
    });//end promise
}

STORAGE.getStore = () => {
  return new Promise(function(resolve, reject) {
     STORAGE.instance.getItem("store")
     .then((store) => {
       resolve(store);
     })
     .catch(err => {
        console.log('STORAGE ERR: ', err);
        reject(err.message);
     })
    });//end promise
}

export default STORAGE;