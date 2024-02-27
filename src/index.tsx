import './index.css';
import * as i18n from 'i18next';
import moment from 'moment';
import 'moment/locale/id';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import LANG_EN from './locale/en';
import { persistor, store } from './store';
import reportWebVitals from './reportWebVitals';

moment.locale('en-EN');

const root = createRoot(document.getElementById('root') as HTMLElement);
i18n.use(initReactI18next).init({
  resources: { en: { translation: LANG_EN } },
  lng: 'id',
  fallbackLng: 'id',
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
