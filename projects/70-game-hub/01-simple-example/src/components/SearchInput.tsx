import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { FormEvent, useRef } from 'react';

interface Props {
  onSearch: (searchText: string) => void;
}

/**
 * Компонент SearchInput предоставляет поле ввода для поиска игр.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSearch - Функция обратного вызова, вызываемая при отправке формы с текстом поиска.
 * @returns {JSX.Element} Поле ввода для поиска игр.
 */
const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (ref.current) {
        onSearch(ref.current?.value);
      }
    }}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input ref={ref} borderRadius={20} placeholder='Search games...' variant='filled' />
      </InputGroup>
    </form>
  );
};

export default SearchInput;