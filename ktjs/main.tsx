import { KTHTMLElement } from 'kt.js';
import App from './App';

const app = document.getElementById('app');
if (app) {
  app.appendChild(<App />);
}
