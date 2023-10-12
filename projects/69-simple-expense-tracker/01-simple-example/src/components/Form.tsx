import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categories } from '../utils/constants.ts';
/**
 * Описание схемы валидации данных для формы ввода расходов.
 * @type {import("zod").ZodObject<{}>}
 */
const schema = z.object({
  description: z.string().min(3, { message: 'Description should be at least 3 characters.' }).max(50),
  amount: z.number({ invalid_type_error: 'Amount is required.' }).min(0.01).max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({
      message: 'Category is required.',
    }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>
/**
 * Свойства компонента Form.
 * @interface IFormProps
 * @property {Function} onSubmit - Функция обратного вызова, вызываемая при отправке формы с данными о расходе.
 */
interface IFormProps {
  onSubmit: (data: ExpenseFormData) => void;
}

/**
 * React-компонент формы для ввода данных о расходе.
 * @function
 * @name Form
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSubmit - Функция обратного вызова, вызываемая при отправке формы с данными о расходе.
 */
const Form = ({ onSubmit }: IFormProps) => {
  // Получение методов и состояния формы с помощью react-hook-form и использование Zod для валидации данных
  const {
    register, // Метод регистрации полей формы
    handleSubmit, // Метод обработки отправки формы
    formState: { errors }, // Состояние ошибок формы
    reset, // Метод сброса значений формы
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form className='grid gap-3' onSubmit={handleSubmit((data) => {
      onSubmit(data);
      reset();
    })}>
      <label className='grid gap-1'>
        <span className='font-medium text-sm'>Description</span>
        <input type='text' className='input' placeholder='Description' {...register('description')} />
        {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
      </label>
      <label className='grid gap-1'>
        <span className='font-medium text-sm'>Amount</span>
        <input type='number' className='input' placeholder='Amount' {...register('amount', {
          valueAsNumber: true,
        })} />
        {errors.amount && <p className='text-red-500 text-sm'>{errors.amount.message}</p>}
      </label>
      <label className='grid gap-1'>
        <span className='font-medium text-sm'>Category</span>
        <select className='input' {...register('category')}>
          <option value=''>All categories</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
        {errors.category && <p className='text-red-500 text-sm'>{errors.category.message}</p>}
      </label>
      <button className='btn' type='submit'>Submit</button>
    </form>
  );
};

export default Form;