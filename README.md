# Todo-list app

- Using Vite to install React template

```Bash
  yarn create vite
```

- Install **Tailwindcss** for Styling

```Bash
  yarn add -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
```

- Tailwind **Config**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- **Start** project

```Bash
  yarn dev
```

## Project Structure

- node_modules/: This directory contains all the dependencies and sub-dependencies of your project.
- public/: This directory contains static files like HTML files and images that are served directly by the web server.
- src/: This directory contains the source code of your application.
- App.tsx: This is the main entry point for your application's React components.
- index.css: This file contains any global CSS styles for your HTML document.
- main.tsx: This file is the entry point for your application and it renders the App component into the root element.
- vite-env.d.ts: This file is used for type declaration in Vite projects.
- .eslintrc.cjs: This file contains the configuration for ESLint, a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- .gitignore: This file specifies intentionally untracked files that Git should ignore.
- index.html: This is the main HTML file for your application.
- package.json: This file contains metadata about the project and lists its dependencies and devDependencies.
- postcss.config.js: This file contains the configuration for PostCSS, a tool for transforming CSS with JS plugins.
- README.md: This file typically contains information about the project, such as how to install and use it.
- tsconfig.json: This file specifies the root files and the compiler options required to compile the project.
- tsconfig.node.json: This file specifies the compiler options required to compile the project for Node.js.
- vite.config.ts: This file contains the configuration for Vite, a fast, lightweight build tool for modern web projects.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
