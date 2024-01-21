// Описаний у документації
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41901135-804299004675a38bc43612a92';


const refs = {
  form: document.querySelector('.js-form'),
  input: document.querySelector('.js-form-input'),
  btn: document.querySelector('.js-form-btn'),
  card: document.querySelector('.js-card-container'),
  loader: document.querySelector('.js-loader'),
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

clearGallery();



refs.form.addEventListener('submit', handleImageSearchSubmit);

function handleImageSearchSubmit(event) {
  event.preventDefault();

  const searchQuery = refs.input.value.trim();

  // refs.loader.classList.add('loader')

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query', // Сообщение на английском
      position: 'topRight',
    });
    return;
  }


  
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      if (!data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }


      refs.card.innerHTML = ('beforeend', createMarkup(data.hits));
      gallery.refresh();
      // return data.hits;
    })
    .finally(() => refs.form.reset());
  
  refs.loader.classList.remove('loader')

}

// function fetchImages(url) {
//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.hits.length !== 0) {
//         refs.card.innerHTML = createMarkup(data.hits);
//         gallery.destroy();
//         gallery = new SimpleLightbox('.gallery a', {});
//       } else {
//         iziToast.error({
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//           position: 'topRight',
//         });
//       }
//     })
//     .catch(error => {
//       console.error('Fetch error:', error);
//       iziToast.error({
//         message: 'An error occurred while fetching data. Please try again.',
//         position: 'topRight',
//       });
//     })
//     .finally(() => refs.form.reset());
// }

function createMarkup(imgCard) {
  return imgCard
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;

      return `
  <li class="card-item">
    <div class="card-img js-card-img gallery">
      <a href="${largeImageURL}" class="big-img js-big-img">
        <img
          src="${webformatURL}"
          alt="${tags}"
          class="small-img js-small-img"
        />
      </a>
    </div>
    <div class="stats-container js-stats-container">
      <p class="stats">Likes: ${likes}</p>
      <p class="stats">Views: ${views}</p>
      <p class="stats">Comments: ${comments}</p>
      <p class="stats">Downloads: ${downloads}</p>
    </div>
  </li>
`;
    })
    .join('');
}

function clearGallery() {
  refs.card.innerHTML = '';
}
