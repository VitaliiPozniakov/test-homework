import axios from 'axios';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    // console.log(this)
    const BASE_URL = 'https://pixabay.com/api';
    const API_KEY = '28004990-f3c49f187ad64f64267c5955f';

    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: this.page,
    });

    const url = `${BASE_URL}/?${searchParams}`;
    const images = await axios.get(url);

    this.incrementPage();

    return images.data;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
