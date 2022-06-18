import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from './imagesApiServise';
import { makeImageMarkup } from './makeImageMarkup';
import BtnLoadMore from './btn-load-more';

const imagesApiService = new ImagesApiService();
const btnLoadMore = new BtnLoadMore({
  selector: `[data-action="load-more"]`,
  hidden: true,
});



const refs = {
  form: document.querySelector(`.js-search-form`),
  gallery: document.querySelector(`.gallery`),
  btnLoadMore: document.querySelector(`[data-action="load-more"]`),
};

refs.form.addEventListener('submit', onFormSubmit);
btnLoadMore.refs.button.addEventListener(`click`, fetchAndRenderImages);
// refs.gallery.addEventListener(`click`, onGalleryClick);

async function onFormSubmit(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  btnLoadMore.show();
  // imagesApiService.resetPage();

  clearContainer();

  const images = await imagesApiService.fetchImages();

  console.log(images)

  // if (images.hits.length > 0) {
  //   Notify.info(`Hooray! We found ${images.totalHits} images.`);
  // }


  // if (images.hits.length === 0) {
  //   Notify.info(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  //   btnLoadMore.hide();
  //   refs.gallery.innerHTML = '';
  //   return;
  // }

  // await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  const images = await imagesApiService.fetchImages();
  
  let imagesContainer = document.querySelectorAll(`.gallery__item`);
 
  //     console.log(images.totalHits);
  // console.log(images.hits.length);
  // console.log(imagesContainer.length);
  // console.log(images)
  // if (images.totalHits <= imagesContainer.length) {
  //   btnLoadMore.hide();
  //   Notify.failure(
  //     'Ups We are sorry, but you have reached the end of search results. '
  //   );
  //   return;
  // }

  try {
    btnLoadMore.disable();

    const images = await imagesApiService.fetchImages();

    // console.log(images);

    const imageMarkup = await makeImageMarkup(images);

    // console.log(imageMarkup)
    btnLoadMore.enable();

    console.log(imagesApiService)
    // console.log(imagesApiService.page)

    renderImageCard(imageMarkup);

   


    imagesContainer = document.querySelectorAll(`.gallery__item`);
    // console.log(imagesContainer.length);
  } catch (error) {
    showError();
  }
}

function renderImageCard(imageMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', imageMarkup);
}

function showError() {
  return Notify.failure('Ups');
}

function clearContainer() {
  refs.gallery.innerHTML = '';
}

// function onGalleryClick(e) {
//   e.preventDefault();
//   const lightbox = new SimpleLightbox('.gallery a');
//   // lightbox.refresh();
// }
