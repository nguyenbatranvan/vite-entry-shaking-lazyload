<h1 align="center">vite-entry-shaking-lazy-load</h1>

<p align="center">
  Mimic tree-shaking behaviour when importing code from an entry file in development & serve mode.
</p>

> **Warning**
> This plugin is experimental, bugs might be expected and some edge cases might not be covered.

> **Note**
> The main execution logic of this plugin only applies to development mode because it addresses an issue which is
> specific to development mode.

## Features

- I have a files in ```src/charts/index.ts```

```ts
export {Chart1} from "./Chart1.tsx"
export {Chart2} from "./Chart2.tsx"
export {Chart3} from "./Chart3.tsx"
```

In `App.tsx`, i used `Chart1`

```ts
import {Chart1} from "./charts"

const App = () => {
    return <Chart1 / >
}
```

Although only using `Chart1`, but `Chart2` and `Chart3` are also loaded

**This plugin was written to solve that problem**

- Plugin support `lazy load` & `@loadable/components`
  **With lazy load react**

```ts
import {lazy} from "React";

const Chart1 = lazy(() => import("./charts").then(m => ({default: m.Chart1})))
const App = () => {
    return <Chart1 / >
}
```

**With @loadable/components**

```ts
const Chart1 = loadable(() => import("./components/chart"), {
    resolveComponent: cpn => cpn.Chart1
})
const App = () => {
    return <Chart1 / >
}
```

Work well

## Install

```bash
# Using npm
npm i -D vite-entry-shaking-lazy-load
# Using Yarn
yarn add -D vite-entry-shaking-lazy-load
# Using pnpm
pnpm add -D vite-entry-shaking-lazy-load
```

## Usage

Setup the plugin in your Vite configuration file.

```ts
import {resolve} from 'path';
import {defineConfig} from 'vite';
import EntryShakingPlugin from 'vite-entry-shaking-lazy-load';

const plugins = [
    EntryShakingPlugin({
        targets: [resolve(__dirname, 'src/charts')],
    })]

export default defineConfig(async () => ({
    plugins
}));
```

if your project uses alias import, you should run with alias resolve

````ts
import {resolve} from 'path';
import {defineConfig} from 'vite';
import EntryShakingPlugin from 'vite-entry-shaking-lazy-load';

const plugins = [
    EntryShakingPlugin({
        targets: [resolve(__dirname, 'src/charts')],
    })]

export default defineConfig(async () => ({
    resolve: {
        alias: [{
            // examples
            find: "@component", replacement: path.resolve(__dirname, "./src/components")
        }]
    },
    plugins
}));
````
