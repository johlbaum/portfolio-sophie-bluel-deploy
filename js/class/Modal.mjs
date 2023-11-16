import { AddWorkForm } from './AddWorkForm.mjs';
import { Filters } from './Filters.mjs';
import { Works } from './Works.mjs';

export class Modal {
  constructor(worksData) {
    this.worksData = worksData;
    this.editWorksButton = document.querySelector('.edit-works');
    this.editWorksButtonIcon =
      this.editWorksButton.querySelector(':first-child');
    this.editWorksButtonPara =
      this.editWorksButton.querySelector(':nth-child(2)');
    this.modalContainer = document.querySelector('.modal-container');
    this.modalContent = document.querySelector('.modal-content');
    this.modalWorks = document.querySelector('.modal-works');
    this.closeModalIcon = document.querySelectorAll('.close-modal-icon');
    this.addPictureContent = document.querySelector('.add-picture-content');
    this.photoGalleryContent = document.querySelector('.photo-gallery-content');
    this.addPictureButton = document.querySelector('.add-picture');
    this.backToPhotoGalleryIcon = document.querySelector(
      '.back-to-photo-gallery-icon',
    );

    this.works = new Works();
    this.filters = new Filters();
    this.addWorkForm = new AddWorkForm(this.addWorkManager);
    this.initializeListeners();
  }

  showModalWorks = () => {
    this.worksData.forEach((work) => {
      const worksContainer = document.createElement('div');
      const workImgContainer = document.createElement('div');
      const workImage = document.createElement('img');
      const deleteIcon = document.createElement('i');
      const workEdit = document.createElement('p');

      worksContainer.classList.add('modal-work');
      worksContainer.classList.add(`work-${work.id}`);
      workImgContainer.classList.add('work-img-container');
      workImage.src = work.imageUrl;
      deleteIcon.classList.add(
        'fa',
        'fa-2xs',
        'regular',
        'fa-trash-can',
        'delete-work-icon',
      );
      workEdit.textContent = 'éditer';

      this.modalWorks.appendChild(worksContainer);
      worksContainer.appendChild(workImgContainer);
      workImgContainer.appendChild(workImage);
      workImgContainer.appendChild(deleteIcon);
      worksContainer.appendChild(workEdit);
    });

    //Add a move icon on the image of the first project of the modal if it contains at least one project.
    const firstModalWork = document.querySelector('.modal-work:first-child');
    if (firstModalWork !== null) {
      const firstWorkImgContainer = firstModalWork.querySelector(
        '.work-img-container',
      );
      const moveWorkIcon = document.createElement('i');
      moveWorkIcon.classList.add(
        'fa-solid',
        'fa-2xs',
        'fa-up-down-left-right',
        'move-work-icon',
      );
      firstWorkImgContainer.appendChild(moveWorkIcon);
    }

    this.attachDeleteEventListeners(this.worksData);
  };

  attachDeleteEventListeners = (worksData) => {
    const deleteWorkIcons = document.querySelectorAll('.delete-work-icon');
    deleteWorkIcons.forEach((deleteWorkIcon, deleteIconIndex) => {
      deleteWorkIcon.addEventListener('click', () => {
        worksData.forEach((workToDelete, workToDeleteIndex) => {
          if (deleteIconIndex === workToDeleteIndex) {
            this.works.deleteWork(workToDelete.id).then(() => {
              this.deleteWorkManager(workToDelete);
            });
          }
        });
      });
    });
  };

  openModal = () => {
    this.modalContainer.classList.add('modal-is-open');
    this.emptyModal();
    this.showModalWorks(this.worksData);
  };

  closeModal = () => {
    this.modalContainer.classList.remove('modal-is-open');
    this.addPictureContent.classList.add('hide');
    this.photoGalleryContent.classList.add('show');
    this.addWorkForm.resetForm();
  };

  handleClickOutsideModal = (e) => {
    if (
      !this.modalContent.contains(e.target) &&
      e.target !== this.editWorksButtonIcon &&
      e.target !== this.editWorksButtonPara
    ) {
      this.closeModal();
    }
  };

  toogleModalContent = () => {
    this.photoGalleryContent.classList.toggle('show');
    this.addPictureContent.classList.toggle('hide');
  };

  emptyModal = () => {
    this.modalWorks.innerHTML = '';
  };

  updateWorksDataAfterAdd = (newWork) => {
    this.worksData.push(newWork);
  };

  updateWorksDataAfterDelete = (workToDelete) => {
    const index = this.worksData.findIndex(
      (work) => work.id === workToDelete.id,
    );
    if (index !== -1) {
      this.worksData.splice(index, 1);
    }
  };

  addWorkManager = (newWork) => {
    setTimeout(() => {
      this.toogleModalContent();
      this.emptyModal();
      this.updateWorksDataAfterAdd(newWork);
      this.showModalWorks(this.worksData);
      this.works.showWorks(this.worksData);
    }, 1500);
  };

  deleteWorkManager = (workToDelete) => {
    setTimeout(() => {
      this.emptyModal();
      this.updateWorksDataAfterDelete(workToDelete);
      this.showModalWorks(this.worksData);
      this.works.showWorks(this.worksData);
    }, 1500);
  };

  initializeListeners = () => {
    this.editWorksButton.addEventListener('click', this.openModal);
    this.closeModalIcon.forEach((curr) => {
      curr.addEventListener('click', this.closeModal);
    });
    document.addEventListener('click', this.handleClickOutsideModal);
    this.addPictureButton.addEventListener('click', this.toogleModalContent);
    this.backToPhotoGalleryIcon.addEventListener(
      'click',
      this.toogleModalContent,
    );
  };
}
