import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 1000;

import apiService from './apiService';
import refs from './refs';
import galleryListMarkup from '../templates/galleryList.hbs';
import loadMoreBtn from './loadMoreBtn';

refs.searchForm.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', getGalleryImages);

function onSearchImages(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value;

  if (!apiService.query.trim()) {
    showNotification();
    onClearPage();
    return;
  }

  apiService.resetPage();
  onClearPage();
  getGalleryImages();
  refs.searchForm.reset();
}

async function getGalleryImages() {
  // let message = '';
  loadMoreBtn.disable();

  try {
    apiService.fetchImages().then(data => {
      if (data.hits.length === 0) {
        showNotification();
      } else if (data.hits.length < 12) {
        onRenderMarkup(data.hits);
        loadMoreBtn.hide();
      } else if (data.hits.length >= 12) {
        onRenderMarkup(data.hits);
        loadMoreBtn.show();
        loadMoreBtn.enable();
        setTimeout(onScrollPage, 1000);
      }
    });
  } catch (error) {
    console.log(error);
    showNotification();
  }
}

function onRenderMarkup(images) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryListMarkup(images));
}

function onClearPage() {
  refs.galleryList.innerHTML = '';
}

function onScrollPage() {
  refs.galleryList.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function showNotification() {
  loadMoreBtn.hide();
  const message = 'Requested images not found!';
  error({
    text: `${message}`,
  });
}
