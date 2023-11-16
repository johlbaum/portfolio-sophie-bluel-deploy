import { Filters } from './Filters.mjs';
import { AdminAccess } from './AdminAccess.mjs';
import { Works } from './Works.mjs';

export class App {
  constructor() {
    this.works = new Works();
    this.filters = new Filters();
    this.adminAccess = new AdminAccess();
  }

  init = () => {
    this.works.getWorks().then((worksData) => {
      this.works.showWorks(worksData);
      this.filters.setupFilters(worksData, false);
      this.adminAccess.handleAdminAccess(worksData);
    });
  };
}
