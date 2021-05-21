/* eslint import/extensions: "off" */

import {
  createDB, viewNote,
} from './db.js';

window.onload = () => {
  createDB();
};

document.getElementById('btnViewNote').addEventListener('click', (event) => {
  viewNote(event, true);
});
