import { FC } from 'react';

interface IResultProps {
  label: string,
  value: number
}

const Result: FC<IResultProps> = ({ label, value }) => {
  return (
    <p className='border flex justify-center items-center p-2 gap-1'>
      {label}: <span className='font-bold'>{value}</span>
    </p>
  );
};
export default Result;
