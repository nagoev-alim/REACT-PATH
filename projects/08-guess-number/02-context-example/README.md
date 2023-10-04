## 📦 Приложение - Угадай число

### 🚀 Обзор
Данный код представляет собой React-приложение для игры "Угадай число." Вот краткое описание его функциональности:

1. **AppProvider**:
    - Создает контекст приложения `AppContext`, в котором содержатся значения и функции для взаимодействия с состоянием игры.
    - Предоставляет компонентам доступ к этому контексту.
    - Использует состояние игры, отслеживает попытки и устанавливает секретное число.
    - Реализует обработчик отправки формы ввода числа. В случае правильного угадывания числа, выводит сообщение о победе, запускает анимацию конфетти и перезапускает игру. Если число не угадано, выводит сообщение о проигрыше и предоставляет еще попытки.

2. **useAppContext**:
    - Это хук для получения доступа к контексту приложения. Он позволяет компонентам использовать значения и функции, предоставленные `AppProvider`. Если хук используется вне `AppProvider`, он вызывает ошибку.

3. **App**:
    - Главный компонент приложения "Guess Number".
    - Использует `useAppContext` для доступа к контексту приложения, включая ссылку на элемент ввода и обработчик отправки формы.
    - Визуально отображает заголовок, описание игры и форму для ввода числа.
    - Обработчик отправки формы передается из контекста, что позволяет игроку вводить числа и взаимодействовать с логикой игры.
    - Использует `react-hot-toast` для отображения уведомлений и конфетти для анимации при угадывании числа.

Это приложение создает интерактивный опыт игры "Угадай число", предоставляя пользователю возможность ввода чисел и получения уведомлений о результатах игры.

---
#### 🌄 Превью:
![Превью](public/images/preview.jpg)


-----
#### 🙌 Автор: [@nagoev-alim](https://github.com/nagoev-alim)
