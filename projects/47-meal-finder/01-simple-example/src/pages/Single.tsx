import axios from 'axios';
import { API_URL } from '../utils/constants.ts';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Ping } from '@uiball/loaders';

interface Data {
  ingredients: {
    ingredient: string;
    measure: string;
  }[];
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
}

axios.defaults.baseURL = API_URL;
/**
 * React-компонент для страницы отображения информации о конкретном блюде.
 * @function
 * @name Single
 */
const Single = () => {
  /**
   * Идентификатор блюда, получаемый из URL.
   * @type {string}
   */
  const { mealId } = useParams();

  /**
   * Состояние, содержащее информацию о блюде.
   * @type {Data | null}
   */
  const [data, setData] = useState<Data | null>(null);

  /**
   * Состояние для отслеживания состояния загрузки.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Функция для выполнения загрузки данных о конкретном блюде при монтировании компонента.
   * @returns {void}
   */
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

  return (
    <div className='grid gap-3'>
      <Link className='btn max-w-max' to='/'>Back</Link>
      <div className='bg-white p-3 border-2 rounded'>
        {isLoading
          ? (
            <div className='grid place-items-center'>
              <Ping size={45} speed={2} color='black' />
            </div>
          )
          : (
            <div className='grid gap-2'>
              {data && (
                <div className='grid gap-3'>
                  <h2 className='font-bold text-3xl'>{data.strMeal}</h2>
                  <img className='max-w-[250px] rounded' src={data.strMealThumb} alt={data.strMeal} />
                  <div className='grid gap-2'>
                    {data.strCategory && <p><span className='font-bold'>Category:</span> {data.strCategory}</p>}
                    {data.strArea && <p><span className='font-bold'>Area:</span> {data.strArea}</p>}
                  </div>
                  <div className='grid gap-2'>
                    <p>{data.strInstructions}</p>
                    <h3 className='font-bold'>Ingredients:</h3>
                    <ul className='list-disc list-inside'>
                      {data.ingredients.map(({ ingredient, measure }, idx) =>
                        <li key={idx}> {ingredient} - {measure}</li>,
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Single;
