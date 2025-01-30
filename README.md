# rollup-plugin-twine

A Rollup plugin for compiling [Twine](https://twinery.org/) story formats.

## Usage

```js
// rollup.config.js
import twine from "rollup-plugin-twine";

export default {
  input: "src/main.js",
  plugins: [
    iife(),
    twine({
      name: "Format name",
      version: "0.0.0",
      description: "Format description",
    }),
  ],
  output: {
    dir: "dist",
  },
};
```

#### Output

```js
window.storyFormat({
  "name": "Format name",
  "version": "0.0.0",
  "description": "Format description",
  "source": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>{{STORY_NAME}}</title>\n</head>\n<body>\n  {{STORY_DATA}}\n  <script>\n    !function(){\"use strict\";console.log(\"hello\")}();\n  </script>\n</body>\n</html>"
});
```