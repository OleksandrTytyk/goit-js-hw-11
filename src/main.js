// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41901135-804299004675a38bc43612a92';

const refs = {
  form: document.querySelector('.js-form'),
  input: document.querySelector('.js-form-input'),
  btn: document.querySelector('.js-form-btn'),
};

refs.form.addEventListener('submit', handleImageSearchSubmit);

function handleImageSearchSubmit(event) {
  event.preventDefault();
  const searchQuery = refs.input.value;

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery.trim()}&image_type=photo&orientation=horizontal&safesearch=true`;

  console.log('handleImageSearchSubmit ~ searchQuery:', searchQuery.trim());

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      console.log(data.hits.length);
    });
  refs.form.reset();
}
