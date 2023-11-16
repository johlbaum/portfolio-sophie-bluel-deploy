import { Works } from './Works.mjs';
import { Categories } from './Categories.mjs';

export class AddWorkForm {
  constructor(addWorkManager) {
    this.addProjectForm = document.querySelector('.send-work-form');
    this.imgInput = document.getElementById('img-input');
    this.imgPreview = document.querySelector('.img-preview');
    this.imgInputElements = document.querySelector('.img-input-elements');
    this.titleInput = document.getElementById('title');
    this.categorySelect = document.getElementById('category');
    this.submitButton = document.getElementById('submit-button');
    this.imageFile = '';
    this.addWorkManager = addWorkManager;
    this.addWorkFormMessage = document.querySelector('.add-work-form-message');
    this.categorySelect = document.getElementById('category');
    this.works = new Works();
    this.categories = new Categories();
    this.initializeListeners();
  }

  showImagePreview = () => {
    const [file] = this.imgInput.files;
    if (file) {
      this.imgInputElements.classList.add('hide-img-input-elements');
      this.imgPreview.classList.add('display-img-preview');
      this.imgPreview.src = URL.createObjectURL(file);
    }
  };

  getImageFile = (e) => {
    this.imageFile = e.target.files[0];
  };

  addCategoriesToSelectForm = async () => {
    const selectElement = document.getElementById('category');
    try {
      const categoriesData = await this.categories.GetCategories();
      categoriesData.forEach((category) => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.textContent = category.name;
        selectElement.appendChild(optionElement);
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateSubmitButtonColor = () => {
    const isFormComplete =
      this.titleInput.value !== '' &&
      this.categorySelect.value !== '' &&
      this.imgInput.files.length > 0;

    isFormComplete
      ? this.submitButton.classList.add('submit-is-valid')
      : this.submitButton.classList.remove('submit-is-valid');
  };

  showAlertMessage = (message) => {
    this.addWorkFormMessage.textContent = message;

    setTimeout(() => {
      this.addWorkFormMessage.textContent = '';
    }, 1500);
  };

  validateFormFields = (e) => {
    if (
      !this.imageFile ||
      e.target.elements.title.value === '' ||
      e.target.elements.category.value === ''
    ) {
      this.showAlertMessage('Veuillez remplir tous les champs');
      return false;
    }
  };

  resetForm = () => {
    this.submitButton.classList.remove('submit-is-valid');

    setTimeout(() => {
      this.titleInput.value = '';
      this.categorySelect.value = '';
      this.imageFile = '';
      this.imgInput.value = '';
      this.imgInputElements.classList.remove('hide-img-input-elements');
      this.imgPreview.classList.remove('display-img-preview');
      this.submitButton.disabled = false;
    }, 1500);
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (!this.submitButton.disabled && this.validateFormFields(e) !== false) {
      this.submitButton.disabled = true;

      this.works
        .addWork(e, this.imageFile)
        .then((newWork) => {
          this.addWorkManager(newWork);
          this.resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  initializeListeners = () => {
    this.addCategoriesToSelectForm();
    this.titleInput.addEventListener('input', this.updateSubmitButtonColor);
    this.categorySelect.addEventListener('input', this.updateSubmitButtonColor);
    this.imgInput.addEventListener('input', this.updateSubmitButtonColor);
    this.imgInput.addEventListener('change', this.getImageFile);
    this.imgInput.addEventListener('change', this.showImagePreview);
    this.addProjectForm.addEventListener('submit', this.submitHandler);
  };
}
