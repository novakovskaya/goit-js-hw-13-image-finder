import refs from './refs';

export default {
  enable() {
    refs.loadMoreBtn.disabled = false;
    refs.labelBtn.textContent = 'Load More';
  },

  disable() {
    refs.loadMoreBtn.disabled = true;
    refs.labelBtn.textContent = 'Loading...';
  },

  show() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  },

  hide() {
    refs.loadMoreBtn.classList.add('is-hidden');
  },
};
