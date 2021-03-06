
[![CI](https://github.com/alimfeld/matherhorn/actions/workflows/ci.yml/badge.svg)](https://github.com/alimfeld/matherhorn/actions/workflows/ci.yml)

# Mathegral

Generate mathematical problems and show their solution.

## Deployment

This application is deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

You can find the live version of this application [here](https://mathegral.pages.dev/).

## Development

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technology Choices

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)
- [mathjs](https://mathjs.org)
- [KaTeX](https://katex.org)
- [i18next](https://react.i18next.com)

## Concepts

Main concepts can be found in [ProblemGeneratorSpi](src/problem/ProblemGeneratorSpi.ts).

- A `ProblemGenerator` generates a mathematical `Problem`
- A `Problem` can be formatted to a `FormattedProblem` by the same `ProblemGenerator`
- A `FormattedProblem` consists of a `description` and a `solution` (both KaTeX strings)

## Cookbook

### Adding a `ProblemGenerator`

1. Add a `ProblemGenerator` in [src/problem/generator](src/problem/generator)
2. Register the `ProblemGenerator` in the [problemGeneratorIndex](src/problem/problemGeneratorIndex.ts)
3. Add translations in [public/locales](public/locales)
