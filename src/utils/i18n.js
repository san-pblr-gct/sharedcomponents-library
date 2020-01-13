import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from 'assets/locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      ru
    },
    lng: 'en', // language to use
    fallbackLng: 'en',
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    nsSeparator: false,
    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
