const API_KEY = '23966017-42a6e7201c4148adfb36c1add';
const BASE_URL = 'https://pixabay.com/api/';

export default {
  searchQuery: '',
  page: 1,
  perPage: 12,

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`,
    );
    this.incrementPage();

    return await response.json();
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
};
