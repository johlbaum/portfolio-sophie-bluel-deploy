export class Categories {
  GetCategories = async () => {
    try {
      const response = await fetch("http://localhost:5678/api/categories");
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }
      const categoriesData = await response.json();
      return categoriesData;
    } catch (error) {
      console.error(error);
    }
  };
}
