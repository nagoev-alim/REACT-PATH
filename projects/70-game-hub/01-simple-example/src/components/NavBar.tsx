import { HStack, Image } from '@chakra-ui/react';
import logo from '../assets/img/logo.webp';
import { ColorModeSwitch, SearchInput } from './index.ts';

interface Prop {
  onSearch: (searchText: string) => void;
}
/**
 * Компонент NavBar представляет верхнюю панель навигации.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSearch - Функция обратного вызова, вызываемая при выполнении поиска.
 * @returns {JSX.Element} Компонент верхней панели навигации.
 */
const NavBar = ({ onSearch }: Prop) => {
  return (
    <HStack padding='10px'>
      <Image src={logo} boxSize='60px' />
      {/* Компонент SearchInput для ввода и выполнения поисковых запросов */}
      <SearchInput onSearch={onSearch} />
      {/* Компонент ColorModeSwitch для переключения темы приложения */}
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;