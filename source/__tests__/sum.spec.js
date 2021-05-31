/**
 * @jest-environment jsdom
 */

import { createDB } from '../scripts/db.js';
require('fake-indexeddb/auto');

describe('test pushToHistory', () => {
  test('tests length of history', () => {
    // append note data
    document.body.innerHTML =
      '<ul id="notelist"><bullet-note class="bullet" data-starttime="false" data-important="false">\n        <div class="fas fa-circle fa-fw bicon" aria-hidden="true"></div>\n        <ul class="bdropdown" data-show="false"><li class="bdropdown-option" data-bindex="0"><div class="fas fa-circle fa-fw bdropdown-option-icon" aria-hidden="true"></div></li><li class="bdropdown-option" data-bindex="1"><div class="fas fa-square fa-fw bdropdown-option-icon" aria-hidden="true"></div></li><li class="bdropdown-option" data-bindex="2"><div class="fas fa-star fa-fw bdropdown-option-icon" aria-hidden="true"></div></li></ul>\n        <input type="time" class="bullettime">\n        <p class="textbox" contenteditable="true">Hey my name is thomas!</p>\n        </bullet-note><bullet-note class="bullet" data-starttime="false" data-important="true">\n        <div class="fas fa-star fa-fw bicon" aria-hidden="true"></div>\n        <ul class="bdropdown" data-show="false"><li class="bdropdown-option" data-bindex="0"><div class="fas fa-circle fa-fw bdropdown-option-icon" aria-hidden="true"></div></li><li class="bdropdown-option" data-bindex="1"><div class="fas fa-square fa-fw bdropdown-option-icon" aria-hidden="true"></div></li><li class="bdropdown-option" data-bindex="2"><div class="fas fa-star fa-fw bdropdown-option-icon" aria-hidden="true"></div></li></ul>\n        <input type="time" class="bullettime">\n        <p class="textbox" contenteditable="true">I love cats</p>\n        </bullet-note></ul>';
    createDB(false);
    expect(document.getElementById('calendar')).toBe(2);
  });
  //   test('tests current state object', () => {
  //     expect(addNoteDB('settings', 6).state).toStrictEqual({
  //       page: 'settings',
  //     });
  //   });
});
