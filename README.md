# Онлайн-кинотеатр

## Запуск приложения

С рабочей версией проекта можно ознакомиться по ссылке: https://kdarenskii.github.io/cinema/                        
(приложение было опубликовано с помощью сервиса [GitHub Pages](https://pages.github.com/))

#### Чтобы локально запустить приложение, необходимо:

1.  Перейти в папку `client`, с помощью терминала и команды `npm i` установить все необходимые зависимости.
2.  В папке `client/src` создать файл `.env.local` и поместить в него следующую строку: `REACT_APP_BASE_URL=https://circular-gaudy-authorization.glitch.me/`.
3.  Командой `npm start` произвести запуск приложения.

#### Чтобы использовать локальный сервер, необходимо дополнительно:

1. В папке `client/src` в файле `.env.local` добавить (изменить) строку `REACT_APP_BASE_URL=http://localhost:3500/`
2. Перейти в папку `server`, с помощью терминала и команды `npm i` установить все необходимые зависимости.
3. Командой `npm start` запустить сервер.
4. В папке `client` повторно запустить приложение командой `npm start`.

Серверные данные будут находиться в папке `server/data/db.json`.

## Используемые ресурсы и инструменты

### Клиентская часть

-   [React (документация)](https://reactjs.org/docs/getting-started.html)

-   [TypeScript (документация)](https://www.typescriptlang.org/docs/)

-   [Redux Toolkit (документация)](https://redux-toolkit.js.org/)

-   [React Router (документация)](https://reactrouter.com/en/main)

-   [Formik (документация)](https://formik.org/docs/overview)

-   [Yup (репозиторий)](https://github.com/jquense/yup)

-   [Axios (документация)](https://axios-http.com/ru/docs/intro)

-   [Swiper (документация)](https://swiperjs.com/react#usage)

-   [React-Toastify (репозиторий)](https://github.com/fkhadra/react-toastify)

-   [Sass (документация)](https://sass-lang.com/documentation/)

-   [Jest (документация)](https://jestjs.io/docs/getting-started)

-   [React Testing Library (документация)](https://testing-library.com/docs/react-testing-library/intro)

-   [Mock Service Worker (документация)](https://mswjs.io/docs/getting-started/install)

### Серверная часть

-   [JSON Server (репозиторий)](https://github.com/typicode/json-server) - Fake REST API
-   [JSON Server Auth (репозиторий)](https://github.com/jeremyben/json-server-auth) - JWT authentication middleware for JSON Server

Cервер размещен с помощью сервиса [Glitch](https://glitch.com/)
