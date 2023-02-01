import { Link, useParams } from 'react-router-dom';
import { Ping } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1/';

const DetailPage = () => {
  const { mealId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { data: { meals } } = await axios.get(`lookup.php?i=${mealId}`);
        const { strMeal, strMealThumb, strInstructions, strCategory, strArea } = meals[0];

        let ingredients = [];
        Object.keys(meals[0]).forEach((item, index) => {
          if (meals[0][`strIngredient${index}`]) {
            ingredients.push({
              'ingredient': meals[0][`strIngredient${index}`],
              'measure': meals[0][`strMeasure${index}`],
            });
          }
        });

        setData({ strMeal, strMealThumb, strInstructions, strCategory, strArea, ingredients });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setData(null);
        toast.error('Something wrong, open dev console.');
        console.log(e);
      }
    })();
  }, [mealId]);

  // 🚀 RENDER: ================================
  return <div className='page-detail'>
    <Link className='button' to='/'>Back</Link>
    <div className='body'>
      {isLoading
        ? (<div className='loading'><Ping size={45} speed={2} color='black' /></div>)
        : (<div className='detail'>
          {data && <>
            <h1>{data.strMeal}</h1>
            <img src={data.strMealThumb} alt={data.strMeal} />
            <div className='info'>
              {data.strCategory && <p><span>Category:</span> {data.strCategory}</p>}
              {data.strArea && <p><span>Area:</span> {data.strArea}</p>}
            </div>
            <div className='bottom'>
              <p>{data.strInstructions}</p>
              <h3>Ingredients:</h3>
              <ul>
                {data.ingredients.map(({ ingredient, measure }, idx) =>
                  <li key={idx}>👉🏻 {ingredient} - {measure}</li>,
                )}
              </ul>
            </div>
          </>}
        </div>)}
    </div>
  </div>;
};

export default DetailPage;
