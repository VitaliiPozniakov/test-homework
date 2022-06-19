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
  gallery: document.querySelector(`.container`),
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

  let lightbox = new SimpleLightbox('.container a', {
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


window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect()
  console.log('bottom', documentRect.bottom)
  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    console.log('DONE')
    fetchAndRenderImages()
  }
    
})

// populate(); // инициализация документа


// import InfiniteScroll from 'infinite-scroll';

// let infScroll = new InfiniteScroll( '.container', {
//   // defaults listed

//   path: 'https://pixabay.com/api/?key=28004990-f3c49f187ad64f64267c5955f&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2',
//   // REQUIRED. Determines the URL for the next page
//   // Set to selector string to use the href of the next page's link
//   // path: '.pagination__next'
//   // Or set with {{#}} in place of the page number in the url
//   // path: '/blog/page/{{#}}'
//   // or set with function
//   // path: function() {
//   //   return return '/articles/P' + ( ( this.loadCount + 1 ) * 10 );
//   // }

//   append: fetchAndRenderImages,
//   // REQUIRED for appending content
//   // Appends selected elements from loaded page to the container

//   checkLastPage: true,
//   // Checks if page has path selector element
//   // Set to string if path is not set as selector string:
//   //   checkLastPage: '.pagination__next'

//   prefill: false,
//   // Loads and appends pages on intialization until scroll requirement is met.

//   responseBody: 'text',
//   // Sets the method used on the response.
//   // Set to 'json' to load JSON.

//   domParseResponse: true,
//   // enables parsing response body into a DOM
//   // disable to load flat text

//   fetchOptions: undefined,
//   // sets custom settings for the fetch() request
//   // for setting headers, cors, or POST method
//   // can be set to an object, or a function that returns an object

//   outlayer: false,
//   // Integrates Masonry, Isotope or Packery
//   // Appended items will be added to the layout

//   scrollThreshold: 400,
//   // Sets the distance between the viewport to scroll area
//   // for scrollThreshold event to be triggered.

//   elementScroll: false,
//   // Sets scroller to an element for overflow element scrolling

//   loadOnScroll: true,
//   // Loads next page when scroll crosses over scrollThreshold

//   history: 'replace',
//   // Changes the browser history and URL.
//   // Set to 'push' to use history.pushState()
//   //    to create new history entries for each page change.

//   historyTitle: true,
//   // Updates the window title. Requires history enabled.

//   hideNav: undefined,
//   // Hides navigation element

//   status: undefined,
//   // Displays status elements indicating state of page loading:
//   // .infinite-scroll-request, .infinite-scroll-load, .infinite-scroll-error
//   // status: '.page-load-status'

//   button: undefined,
//   // Enables a button to load pages on click
//   // button: '.load-next-button'

//   onInit: undefined,
//   // called on initialization
//   // useful for binding events on init
//   // onInit: function() {
//   //   this.on( 'append', function() {...})
//   // }

//   debug: false,
//   // Logs events and state changes to the console.
// })

// console.log(infScroll)