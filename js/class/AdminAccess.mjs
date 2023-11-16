import { Modal } from './Modal.mjs';
import { Filters } from './Filters.mjs';

export class AdminAccess {
  constructor() {
    this.adminAccess = document.querySelector('.admin-access');
    this.editWorksButton = document.querySelector('.edit-works');
    this.filtersContainer = document.querySelector('.filters');
    this.worksTitleAndEdit = document.querySelector('.works-title-and-edit');
    this.editionModeBar = document.querySelector('.edition-mode-bar');
    this.header = document.querySelector('header');
    this.filters = new Filters();
  }

  userIsLoggedIn = () => {
    const loginInformation = localStorage.getItem('loginInformation');
    return loginInformation;
  };

  logIn = (worksData) => {
    this.adminAccess.innerText = 'logout';
    this.editWorksButton.classList.add('is-logged-in');
    this.filtersContainer.classList.add('is-logged-in');
    this.editionModeBar.classList.add('is-logged-in');
    this.header.classList.add('is-logged-in');
    this.worksTitleAndEdit.classList.add('title-is-logged-in');

    new Modal(worksData);
  };

  logOut = (worksData) => {
    this.adminAccess.innerText = 'login';

    localStorage.removeItem('loginInformation');
    localStorage.clear();

    this.editWorksButton.classList.remove('is-logged-in');
    this.filtersContainer.classList.remove('is-logged-in');
    this.editionModeBar.classList.remove('is-logged-in');
    this.header.classList.remove('is-logged-in');
    this.worksTitleAndEdit.classList.remove('title-is-logged-in');

    this.filters.setupFilters(worksData, true);
  };

  handleAdminAccess = (worksData) => {
    if (this.userIsLoggedIn() !== null) {
      this.logIn(worksData);

      this.adminAccess.addEventListener('click', (e) => {
        if (this.userIsLoggedIn() !== null) {
          e.preventDefault();
          this.logOut(worksData);
        }
      });
    }
  };
}
