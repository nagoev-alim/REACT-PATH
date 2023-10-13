import useGenres, { Genre } from '../hooks/useGenres.ts';
import { Button, Heading, HStack, Image, List, ListItem, Spinner } from '@chakra-ui/react';
import getCropImageUrl from '../services/image-url.ts';

interface Props {
  onSelectedGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

/**
 * Компонент GenreList отображает список жанров для игр и предоставляет пользователю возможность выбора жанра.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSelectedGenre - Функция обратного вызова, вызываемая при выборе жанра.
 * @param {Genre | null} props.selectedGenre - Выбранный жанр.
 * @returns {JSX.Element} Список жанров с возможностью выбора.
 */
const GenreList = ({ onSelectedGenre, selectedGenre }: Props) => {
  const { data, error, isLoading } = useGenres();
  if (error) {
    return null;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Heading fontSize='2xl' marginBottom={3}>Genres</Heading>
      <List>
        {data.map(genre => (
          <ListItem key={genre.id} paddingY='5px'>
            <HStack>
              <Image boxSize='32px' objectFit='cover' borderRadius={8} src={getCropImageUrl(genre.image_background)} />
              <Button whiteSpace='normal' textAlign='left'
                      fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                      onClick={() => onSelectedGenre(genre)} variant='link' fontSize='lg'>{genre.name}</Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;