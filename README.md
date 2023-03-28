<h1 align="center">vite-entry-shaking-lazy-load</h1>

<p align="center">
  Mimic tree-shaking behaviour when importing code from an entry file in development mode.
</p>

> **Warning**
>  This plugin is experimental, bugs might be expected and some edge cases might not be covered.

> **Note**
>  The main execution logic of this plugin only applies to development mode because it addresses an issue which is specific to development mode.

## Features
- I have a files in ```src/charts```


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
import { resolve } from 'path';
import { defineConfig } from 'vite';
import EntryShakingPlugin from 'vite-entry-shaking-lazy-load';
const plugins=[]
// if u want use build
if(isProduction){
    plugins.push( await EntryShakingPlugin({
        targets: [resolve(__dirname, 'src/entry-a')],
    }))
}
else{
    //use server (delvelopment)
    plugins.push( await EntryShakingPlugin({
        targets: [resolve(__dirname, 'src/entry-a')],
    }))
}

export default defineConfig(async () => ({
  plugins
}));
```
