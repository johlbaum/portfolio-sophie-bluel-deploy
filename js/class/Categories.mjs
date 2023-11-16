export class Categories {
  GetCategories = async () => {
    try {
      const response = await fetch(
        'https://portfolio-sophie-bluel-api.onrender.com/api/categories',
      );
      if (!response.ok) {
        throw new Error('Erreur HTTP ' + response.status);
      }
      const categoriesData = await response.json();
      return categoriesData;
    } catch (error) {
      console.error(error);
    }
  };
}
