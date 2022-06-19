import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './imagesApiServise';
import { makeImageMarkup } from './makeImageMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import BtnLoadMore from './btn-load-more';

const imagesApiService = new ImagesApiService();
const btnLoadMore = new BtnLoadMore({
  selector: `[data-action="load-more"]`,
  hidden: true,
});

const {form, gallery} = {
  form: document.querySelector(`.js-search-form`),
  gallery: document.querySelector(`.gallery`),
};



form.addEventListener('submit', onFormSubmit);
btnLoadMore.refs.button.addEventListener(`click`, fetchAndRenderImages);
gallery.addEventListener(`click`, onGalleryClick);

async function onFormSubmit(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.query === null || imagesApiService.query === ``) {
    return
  }

  btnLoadMore.show();
  imagesApiService.resetPage();
  clearContainer();
 const images = await fetchAndRenderImages();

    if (images.hits.length > 0) {
      Notify.info(`Hooray! We found ${images.totalHits} images.`);
    }
}

async function fetchAndRenderImages() {
  try {
    btnLoadMore.disable();
    const images = await imagesApiService.fetchImages();

    // console.log(images)

      let imagesContainer = document.querySelectorAll(`.gallery__item`);
      if (images.totalHits <= imagesContainer.length) {
        btnLoadMore.hide();
        Notify.failure(
          'Ups We are sorry, but you have reached the end of search results. '
        );
        return;
      }


    if (images.hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      btnLoadMore.hide();
      gallery.innerHTML = '';
      return;
    }

    const imageMarkup = await makeImageMarkup(images);
    btnLoadMore.enable();
    renderImageCard(imageMarkup);
    imagesContainer = document.querySelectorAll(`.gallery__item`);


  //   const { height: cardHeight } = document
  //   .querySelector('.gallery')
  //   .firstElementChild.getBoundingClientRect();
  // window.scrollBy({
  //   top: cardHeight * 10,
  //   behavior: 'smooth',
  // });



return images

  } catch (error) {
    showError();
  }
}

function renderImageCard(imageMarkup) {
  gallery.insertAdjacentHTML('beforeend', imageMarkup);
}

function showError() {
  return Notify.failure('Ups');
}

function clearContainer() {
  gallery.innerHTML = '';
}

function onGalleryClick(e) {
  e.preventDefault();

  let lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  // lightbox.refresh();
}




// function infinityScroll() {
//   while(true) {
//     // нижняя граница документа
//     let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

//     // если пользователь прокрутил достаточно далеко (< 100px до конца)
//     if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
//       // добавим больше данных
//       document.body.insertAdjacentHTML("beforeend", `<p>Дата: ${new Date()}</p>`);
//       fetchAndRenderImages()
//     }
//   }
// }


// window.addEventListener('scroll', populate);

// populate(); // инициализация документа