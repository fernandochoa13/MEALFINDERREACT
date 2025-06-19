import React, { useState } from 'react';
import useFetchData from './hooks/useFetchData';
import NavBar from './components/NavBar';
import Card, { CardBody } from './components/Card';
import DashBoard from './components/DashBoard';
import  'bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/Modal';
import Button from './components/Button';
import getIngredientesYMedidas from './utils/getIngredientesYMedidas'

type Meal = {
  strCategory: string;
};

type MealItem = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strInstructions: string;

};

function App() {
  const {
    data: meals,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchData<Meal>(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    json => (Array.isArray(json.meals) ? json.meals : [])
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>('Seafood');
   const [selectedRecipe, setSelectedRecipe] = useState<MealItem | null>(null);

  const {
    data: mealsByCategory,
    loading: loadingMeals,
    error: errorMeals,
  } = useFetchData<MealItem>(
    selectedCategory
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`
      : '',
    json => (Array.isArray(json.meals) ? json.meals : [])
  );

  if (loadingCategories) return <p>Cargando categorías...</p>;
  if (errorCategories) return <p>Error cargando categorías: {errorCategories}</p>;

  const showDetailsRecipe = (meal: MealItem) => {
    setSelectedRecipe(meal);
  };

  const closeDetailsRecipe = () => {
    setSelectedRecipe(null);
  };



  if (loadingCategories) {
    return <p className="p-3">Cargando...</p>;
  }

  if (errorCategories && !loadingCategories) {
    return <p className="p-3 text-danger">Ha ocurrido un error: {errorCategories}</p>;
  }

  return (
    <DashBoard>
    <div className="d-flex">
      <NavBar
        data={meals}
        onClick={(categoria) => setSelectedCategory(categoria)}
      />
    </div>
       {!loadingMeals && mealsByCategory.length > 0 && (
    mealsByCategory.map((meal) => (
      <div className="col-md-4 mb-3" key={meal.idMeal}>
        <Card photo={meal.strMealThumb}>
          <CardBody title={meal.strMeal} />
          <Button onClick={() => showDetailsRecipe(meal)}>Ver detalles</Button>
        </Card>
      </div>
     )) )}
     {/* Modal */}
      {selectedRecipe && (
        <Modal onClose={closeDetailsRecipe}>
          <h1>{selectedRecipe.strMeal}</h1>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
          />
          {/* Aquí puedes agregar más detalles */}
          <h4>Ingredientes:</h4>
          <ul>
            {getIngredientesYMedidas(selectedRecipe).map((item, index) => (
<li key={index}>
  {item.ingrediente} - {item.medida}

</li>
            ))}
          </ul>
          <h4>Instrucciones:</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{selectedRecipe.strInstructions}</p>
        </Modal>
      )}
    </DashBoard>
    
  );
}

export default App;
