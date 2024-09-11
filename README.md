## Getting Started

1. Install node.js
2. Check the node.js version with `node --version`
3. Supported build version is 18+
4. Install dependencies with

   ```shell
   npm i
   ```

5. Run the project with

   ```shell
   npm run dev
   ```

6. Additional commands for working with the build:

   - `npm run convert-rastr`: create webp versions of raster images in the `source/img/` folder;
   - `npm run dev`: starts the development server;
   - `npm run build`: builds an optimized version of the project in the `dist` folder;
   - `npm run preview`: launches the server with the optimized version;
   - the sprite with icons is assembled from files in the `source/img/sprite/` folder;
   - to access the sprite from `html`, use the path `href="/__spritemap#sprite-{icon file name}"`;

7. The `index.html` file in the `source` folder contains tips on the structure of your project.

## Self-checks

Pixel Perfect Testing

You can run the Pixel Perfect testing of your project using

```shell
npm run test 
```

The test framework connects to `localhost:3000`, so the server must be running with `npm run dev`. Run the testing command in a new terminal without closing the project server.

The project includes many additional tools for self-checks. Use them while working and before submitting your project:

- `npm run w3c`: checks HTML validity;
- `npm run linthtml`: checks the markup using linthtml rules;
- `npm run html-validate`: checks HTML;
- `npm run lint-bem`: checks BEM;
- `npm run stylelint`: checks styles according to stylelint rules;
- `npm run lint-js`: checks scripts according to eslint rules;
- `npm run ls-lint`: checks file and folder naming;
- `npm run editorconfig`: checks editorconfig.
