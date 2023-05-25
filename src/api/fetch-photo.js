import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34952835-217ffd47b9fc04227874ce881';

export async function fetchPhoto(searchValue, numberPage = 1) {
  const config = {
    params: {
      key: API_KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: numberPage,
      per_page: 12,
    },
  };

  try {
    let { data } = await axios.get(`${BASE_URL}`, config);
    return data;
  } catch (error) {
    return error.message;
  }
}