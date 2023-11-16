export class Works {
  getWorks = async () => {
    try {
      const response = await fetch(
        'https://portfolio-sophie-bluel-api.onrender.com/api/works',
      );
      if (!response.ok) {
        throw new Error('Erreur HTTP ' + response.status);
      }
      const worksData = await response.json();
      return worksData;
    } catch (error) {
      console.error(error);
    }
  };

  showWorks = (worksData) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    worksData.forEach((work) => {
      const { imageUrl, title } = work;

      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      image.src = imageUrl;
      figcaption.innerText = title;
      figure.classList.add(`work-${work.id}`);

      gallery.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(figcaption);
    });
  };

  addWork = async (e, imageFile) => {
    const jsonLoginInformation = localStorage.getItem('loginInformation');
    const loginInformation = JSON.parse(jsonLoginInformation);
    const token = loginInformation.token;

    const formData = new FormData();

    formData.append('image', imageFile);
    formData.append('title', e.target.elements.title.value);
    formData.append('category', e.target.elements.category.value);

    const showSuccessMessage = (message) => {
      const addWorkMessage = document.querySelector('.add-work-form-message');
      addWorkMessage.textContent = message;

      setTimeout(() => {
        addWorkMessage.textContent = '';
      }, 1500);
    };

    try {
      const response = await fetch(
        'https://portfolio-sophie-bluel-api.onrender.com/api/works',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const newWork = await response.json();
        showSuccessMessage('Le projet a bien été ajouté');
        return newWork;
      } else {
        return Promise.reject(new Error("Erreur lors de l'ajout d'un projet."));
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteWork = async (workToDeleteId) => {
    const showMessage = (message) => {
      const deleteMessage = document.querySelector('.delete-picture-message');
      deleteMessage.textContent = message;

      setTimeout(() => {
        deleteMessage.textContent = '';
      }, 1500);
    };

    try {
      const jsonLoginInformation = localStorage.getItem('loginInformation');
      const loginInformation = JSON.parse(jsonLoginInformation);
      const token = loginInformation.token;

      const response = await fetch(
        `https://portfolio-sophie-bluel-api.onrender.com/api/works/${workToDeleteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        showMessage('Le projet a été supprimé avec succès.');
      } else {
        return Promise.reject(
          new Error('Erreur lors de la suppression du projet.'),
        );
      }
    } catch (error) {
      showMessage('Erreur lors de la suppression du projet.');
      console.error(error);
      throw error;
    }
  };
}
