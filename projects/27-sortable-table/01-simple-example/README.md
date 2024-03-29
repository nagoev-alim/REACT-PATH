## 📦 Приложение - Сортировка данных таблицы

### 🚀 Обзор
Данный код представляет собой React-приложение для отображения таблицы с данными о людях и возможностью их сортировки по разным критериям. Вот краткое описание:

- Код импортирует данные о людях из файла `mock.json` и несколько библиотек React, включая React Icons для иконок.

- Определен интерфейс `Person`, описывающий структуру данных о человеке.

- Есть функция `sortData`, которая принимает данные для сортировки, ключ сортировки и порядок сортировки. Она выполняет сортировку данных и возвращает отсортированный массив людей.

- Создан главный компонент `App`, который представляет собой таблицу с возможностью сортировки данных. Сортировка осуществляется по различным критериям, таким как "ID", "First name", "Last name" и так далее.

- В компоненте `App` используется `useState` для управления текущим ключом сортировки и порядком сортировки.

- Существует функция `handleSortedData`, которая использует `useCallback` и вызывает `sortData` с текущими данными, ключом сортировки и порядком сортировки.

- Есть функция `handleChangeSort`, которая обновляет ключ сортировки и порядок сортировки при щелчке на заголовке столбца.

- Данные отображаются в таблице, и пользователь может сортировать их, щелкая по заголовкам столбцов.

- Создан компонент `SortButton`, который представляет кнопку сортировки с возможностью отображения направления сортировки (вверх или вниз) с помощью иконок.

Код позволяет пользователю отображать и сортировать данные о людях в удобной таблице.

---
#### 🌄 Превью:
![Превью](public/images/preview.jpg)


-----
#### 🙌 Автор: [@nagoev-alim](https://github.com/nagoev-alim)

