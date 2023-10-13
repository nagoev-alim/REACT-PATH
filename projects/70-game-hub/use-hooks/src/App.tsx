import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import { GameGrid, GameHeading, GenreList, NavBar, PlatformSelector, SortSelector } from './components';
import { useState } from 'react';
import { Genre } from './hooks/useGenres.ts';
import { Platform } from './hooks/useGames.ts';

/**
 * Интерфейс для представления запроса поиска игр.
 * @interface GameQuery
 * @property {Genre | null} genre - Выбранный жанр.
 * @property {Platform | null} platform - Выбранная платформа.
 * @property {string} sortOrder - Порядок сортировки результатов.
 * @property {string} searchText - Текст для поиска.
 */

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}
/**
 * Главный компонент приложения "Game Search".
 * @function
 */
const App = () => {
  /**
   * Состояние запроса для поиска игр.
   * @type {GameQuery}
   */
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area='nav'>
        {/* Навигационная панель приложения. */}
        <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} />
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside' padding={5}>
          {/* Список жанров для фильтрации. */}
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectedGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box paddingLeft={2}>
          {/* Заголовок с информацией о текущем запросе. */}
            <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              {/* Селектор платформы для фильтрации игр. */}
              <PlatformSelector
                onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })}
                selectedPlatform={gameQuery.platform}
              />
            </Box>
            {/* Селектор сортировки результатов. */}
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })}
            />
          </Flex>
        </Box>
        {/* Сетка игр с учетом текущего запроса. */}
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
};

export default App;