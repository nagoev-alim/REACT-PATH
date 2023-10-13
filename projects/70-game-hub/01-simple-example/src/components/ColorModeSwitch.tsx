import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react';
/**
 * Компонент ColorModeSwitch представляет переключатель темы для приложения.
 *
 * @component
 * @returns {JSX.Element} Компонент переключателя темы.
 */
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      {/* Переключатель темы с возможностью изменения цветовой схемы */}
      <Switch colorScheme='green' onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
      {/* Текстовое описание текущей темы (Dark Mode) */}
      <Text whiteSpace='nowrap'>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;