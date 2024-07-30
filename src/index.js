import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n'

// Функция для проверки наличия cookie и его установки, если отсутствует
const checkAndSetLangCookie = () => {
  const langCookie = document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (!langCookie) {
    // Если cookie отсутствует, устанавливаем его со значением 'ru'
    document.cookie = 'lang=ru; path=/';
  }
};

checkAndSetLangCookie(); // Вызываем функцию при загрузке страницы

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
