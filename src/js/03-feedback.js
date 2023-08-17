import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Завантаження збережених даних з локального сховища
const savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
emailInput.value = savedState.email || '';
messageInput.value = savedState.message || '';

// Оновлення локального сховища даними з форми з використанням throttle
const updateLocalStorage = throttle(() => {
  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
}, 500);

// Збереження даних форми в локальне сховище під час зміни введених даних
emailInput.addEventListener('input', updateLocalStorage);
messageInput.addEventListener('input', updateLocalStorage);

// Очищення даних форми та локального сховища при відправці
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const currentState = {
    email: '',
    message: '',
  };
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
  console.log('Дані форми відправлено:', currentState);
});
