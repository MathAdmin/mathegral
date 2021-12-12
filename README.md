# Matherhorn

Generate mathematical problems and show their solution.

## Deployment

This application is deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

You can find the live version of this application [here](https://matherhorn.pages.dev/).

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

- [React Framework](https://reactjs.org/)
- [Typescript JS Flavor](https://www.typescriptlang.org/)
- [MUI UI Library](https://mui.com/)
- [react-katex for rendering math expressions](https://github.com/talyssonoc/react-katex)

## Concepts

Main concepts can be found in [ProblemApi](src/problem/ProblemApi.ts).

- A `ProblemGenerator` generates a mathematical problem.
- Every problem belongs to a `ProblemCategory`.
- Every `ProblemCategory` can be rendered to a `Card` (using the visitor pattern).

## Cookbook

### Adding a `ProblemCategory`

1. Add a `ProblemCategory` implementation in [ProblemApi](src/problem/ProblemApi.ts) and extend the `ProblemCategoryVisitor`
2. Extend the renderers in [ProblemGeneratorCard](src/problem/ProblemGeneratorCard.tsx)

### Adding a `ProblemGenerator`

1. Implement a `ProblemGenerator` in `src/problem/generator`
2. Register the `ProblemGenerator` in the [problemGeneratorIndex](src/problem/problemGeneratorIndex.ts)
