```markdown
# React.js TypeScript Project

This document provides an overview of the structure and setup of a React.js project using TypeScript.
```
## Project Structure
```
project-root/
├── src/
│   ├── _helper/
│   │   ├── helper1.ts
│   │   ├── helper2.ts
│   │   └── ...
│   ├── _interfaces/
│   │   ├── interface-feature1.interfaces.ts
│   │   ├── interface-feature2.interfaces.ts
│   │   └── ...
│   ├── assets/
│   │   ├── images/
│   │   │   └── image1.jpg
│   │   └── ...
│   ├── components/
│   │   ├── Components1/
│   │   │   └── index.tsx
│   │   ├── Components2/
│   │   │   └── index.tsx
│   │   └── ...
│   ├── data/
│   │   ├── data1.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── feature1/
│   │   │   └── useHooks1.tsx
│   │   ├── feature2/
│   │   │   └── useHooks2.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── layout1/
│   │   │   └── index.tsx
│   │   ├── layout2/
│   │   │   └── index.tsx
│   │   └── ...
│   ├── locale/
│   │   ├── en/
│   │   │   ├── page.json
│   │   │   └── index.ts
│   │   ├── id/
│   │   │   ├── page.json
│   │   │   └── index.ts
│   │   └── ...
│   ├── pages/
│   │   ├── example-simple-module/
│   │   │   ├── feature.page.tsx
│   │   │   └── index.page.tsx
│   │   ├── example-modular-section-module/
│   │   │   ├── feature.page.tsx
│   │   │   ├── sections
│   │   │   │		├── example-modal.section.tsx
│   │   │   │   └── example.section.tsx
│   │   │   └── index.page.tsx
│   │   ├── example-modular-private-component-module/
│   │   │   ├── feature.page.tsx
│   │   │   ├── components
│   │   │   │		├── unique-button-example.component.tsx
│   │   │   │   └── custom-select.component.tsx
│   │   │   └── index.page.tsx
│   │   └── ...
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── routes.tsx
│   │   └── ...
│   ├── services/
│   │   ├── modules/
│   │   │   ├── module1
│   │   │   │   └── service.tsx
│   │   │   ├── module2
│   │   │   │   └── service.tsx
│   │   ├── api.ts
│   │   ├── errorHandler.ts
│   │   └── ...
│   ├── store/
│   │   ├── store1/
│   │   │   └── index.ts
│   │   ├── store2/
│   │   │   └── index.ts
│   │   ├── cookieStore.js
│   │   ├── index.ts
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.ss
│   └── ...
├── public/
│   ├── index.html
│   └── ...
├── package.json
├── tsconfig.json
└── ...
```
FAQ:
- How to fetch data:
	1. Create service inside `/src/services/modules/[modulesName]/index.tsx`
	2. Use RTK Query that already wrapped `/src/services/api.ts`
	3. Use build.mutation for DELETE, POST, PATCH, PUT
	4. Use build.query for GET
	5. Call wrapped mutation or query from page level like you call hooks
	6. **You don't need to re-setup authorization token inside service module!**
	7. Read the documentation https://redux-toolkit.js.org/rtk-query/overview
- What should I do if i need to store data
	1. **Important! Don't store all data**
	2. **Just store if you need to re-use the data from other modules OR multiple components OR you don't need to refetch**
	3. Create store `/src/store/[modulesName]/index.tsx`
	4. Register store that you create inside combine reducer `/src/store/index.ts`
	5. Read the documentation https://redux-toolkit.js.org/api/createslice
- How to post form data:
	1. Unfortunately, for RTK version 2.2.1, there are still bugs when posting data with form data type
	2. For the time being, you may utilize the 'fetch' provided by JavaScript
	3. **'fetch' is only allowed for posting form data; for other types, you must use RTK Query.**

## Project Setup

### 1. Initialize project

```bash
yarn
```

### 2. Start the development server

```bash
yarn start:dev
```

## Dependencies

The primary dependencies for this project are:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **react-scripts**: Toolchain for creating React applications with no configuration.

## Getting Started

1. **Component Development**: Develop your components inside the `src/components` directory.
2. **Entry Point**: The entry point of your application is `src/index.tsx`.
3. **Run the Project**: Start the development server using `yarn start:[env]`.
4. **Build**: Build your project for production using `yarn build:[env]`.

## PLEASE FOLLOW THE RULES!!! 😡😡😡
# Happy coding! 🎉🎉🎉