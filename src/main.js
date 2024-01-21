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
  loader: document.querySelector('.loader'),
};

refs.loader.style.display = 'none';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

clearGallery();

refs.form.addEventListener('submit', handleImageSearchSubmit);

function fetchData(searchQuery) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (!data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      return data.hits;
    });
}

function handleImageSearchSubmit(event) {
  event.preventDefault();

  refs.loader.style.display = 'block';

  const searchQuery = refs.input.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query',
    });

    return;
  }

  fetchData(searchQuery)
    .then(imgGallery => {
      refs.card.innerHTML = createMarkup(imgGallery);
      gallery.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.loader.style.display = 'none';
      refs.form.reset();
    });
}

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
          width="360px"
          height="260px"
        />
      </a>
    </div>
    <div class="stats-container js-stats-container">
      <p class="stats"><b>Likes:</b> ${likes}</p>
      <p class="stats"><b>Views:</b> ${views}</p>
      <p class="stats"><b>Comments:</b> ${comments}</p>
      <p class="stats"><b>Downloads:</b> ${downloads}</p>
    </div>
  </li>
`;
    })
    .join('');
}

function clearGallery() {
  refs.card.innerHTML = '';
}
