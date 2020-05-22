import axios from 'axios';

const getBook = async () => new Promise((resolve, reject) => {
  const url = 'https://api.jsonbin.io/b/5e69b564d2622e7011565547';
  axios
    .get(url, {})
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default getBook;
