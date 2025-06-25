import React, { useState } from 'react';
import useFetchData from './hooks/useFetchData';
import NavBar from './components/NavBar';
import Card, { CardBody } from './components/Card';
import DashBoard from './components/DashBoard';
import  'bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/Modal';
import Button from './components/Button';
import getIngredientesYMedidas from './utils/getIngredientesYMedidas'
import SearchBar from './components/SearchBar';
import { Group, JsxElement } from '@chakra-ui/react';

type Meal = {
  strCategory: string;
};

type MealItem = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strInstructions: string;

};

type MealDetails = {
  strInstructions: string;
  strIngredient1: string;
      strIngredient2: string,
      strIngredient3: string,
      strIngredient4: string,
      strIngredient5: string,
      strIngredient6: string,
      strIngredient7: string,
      strIngredient8: string,
      strIngredient9: string,
      strIngredient10: string,
      strIngredient11: string,
      strIngredient12: string,
      strIngredient13: string,
      strIngredient14: string,
      strIngredient15: string,
      strIngredient16: string,
      strIngredient17: string,
      strIngredient18: string,
      strIngredient19: string,
      strIngredient20: string,
      strMeasure1: string,
      strMeasure2: string,
      strMeasure3: string,
      strMeasure4: string,
      strMeasure5: string,
      strMeasure6: string,
      strMeasure7: string,
      strMeasure8: string,
      strMeasure9: string,
      strMeasure10: string,
      strMeasure11: string,
      strMeasure12: string,
      strMeasure13: string,
      strMeasure14: string,
      strMeasure15: string,
      strMeasure16: string,
      strMeasure17: string,
      strMeasure18: string,
      strMeasure19: string,
      strMeasure20: string,

}

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
   const [selectedID, setSelectedID] = useState<string | null>(null);


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

  const {
    data: mealsByDetails,
    loading: loadingmealsByDetails,
    error: errormealsByDetails, } = useFetchData<MealDetails>(
      selectedID ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(selectedID)}` : '',
      json => (Array.isArray(json.meals) ? json.meals : [])
    );

    //Busqueda de barra
    const [searchQuery, setSearchQuery] = useState('');

const {
  data: mealsBySearch,
  loading: loadingBySearch,
  error: errorBySearch,
} = useFetchData<MealItem>(
  searchQuery
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`
    : '',
  json => (Array.isArray(json.meals) ? json.meals : [])
);

  

  if (loadingCategories) return <p>Cargando categorías...</p>;
  if (errorCategories) return <p>Error cargando categorías: {errorCategories}</p>;

  

  const showDetailsRecipe = (meal: MealItem) => {
    setSelectedID(meal.idMeal)
    setSelectedRecipe(meal);

  };


  const closeDetailsRecipe = () => {
    setSelectedRecipe(null);
    setSelectedID(null)

  };



  if (loadingCategories) {
    return <p className="p-3">Cargando...</p>;
  }

  if (errorCategories && !loadingCategories) {
    return <p className="p-3 text-danger">Ha ocurrido un error: {errorCategories}</p>;
  }

  return (
    <div>
    <SearchBar onSearch={setSearchQuery}></SearchBar>
    <DashBoard>
      
    <div className="d-flex">
      
      <NavBar
        data={meals}
        onClick={(categoria) => setSelectedCategory(categoria)}
      />
    </div>
    {searchQuery && !loadingBySearch ? (
  mealsBySearch.length > 0 ? (
    mealsBySearch.map((meal) => (
      <div className="col" key={meal.idMeal}>
        <Card photo={meal.strMealThumb}>
          <CardBody title={meal.strMeal} />
          <Button onClick={() => showDetailsRecipe(meal)}>Ver detalles</Button>
        </Card>
      </div>
    ))
  ) : (
    <p className="p-3">No se encontraron recetas para “{searchQuery}”.</p>
  )
) : (
  !loadingMeals && mealsByCategory.length > 0 && (
    mealsByCategory.reduce((chunks: typeof mealsByCategory[][], _, index) => {
      if (index % 3 === 0) {
        chunks.push(mealsByCategory.slice(index, index + 3))
      }
      return chunks
      else {
        rows.push( 
        <div className="col-md-4" key={index}>
          {mealsByCategory.map((m) => (
            <div className="col-md-4" key={m.idMeal}>
              <Card photo={m.strMealThumb}>
                <CardBody title={m.strMeal} />
                <Button onClick={() => showDetailsRecipe(meal)}>Detalles</Button>
                </Card>
                </div>
          ))}
          </div>
          );
      }
      return rows;
    }, []) ))}
    

     {/* Modal */}
      {selectedRecipe && (
        <Modal onClose={closeDetailsRecipe}>
          <h1>{selectedRecipe.strMeal}</h1>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
          />
          
          {mealsByDetails.length > 0 && (
  <div>
    <h4>Ingredientes:</h4>
    <ul>
      {Array.from({ length: 20 }).map((_, i) => {
        const ing = mealsByDetails[0][`strIngredient${i + 1}` as keyof MealDetails];
        const meas = mealsByDetails[0][`strMeasure${i + 1}` as keyof MealDetails];
        return ing && ing.trim() !== '' ? (
          <li key={i}>{`${meas} ${ing}`}</li>
        ) : null;
      })}
    </ul>

    <h4>Instrucciones:</h4>
    <p>{mealsByDetails[0].strInstructions}</p>
  </div>
  
)}
          <ul>
            
          </ul>
        </Modal>
      )}
    </DashBoard>
    </div>
    
  );
}

export default App;
