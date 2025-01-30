import { minify } from "terser";

const storyFormatTemplate = ({ name, version, source, description }) => (`
window.storyFormat({
  "name": ${JSON.stringify(name)},
  "version": ${JSON.stringify(version)},
  "description": ${JSON.stringify(description)},
  "source": ${JSON.stringify(source)}
});`.trim());

const htmlTemplate = ({ storyFormatSource }) => (`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{STORY_NAME}}</title>
</head>
<body>
  {{STORY_DATA}}
  <script>
    ${storyFormatSource}
  </script>
</body>
</html>
`.trim());

export default function twine(opts = {}) {
  // add option to disable minification?
  const { name, version, description, minifyOpts } = opts;
  return {
    name: "rollup-plugin-twine",
    async generateBundle(_output, bundle) {
      // find the entry point
      const [key, chunk] = Object.entries(bundle).find(([_k, v]) => v.isEntry);
      const source = await minify(chunk.code, minifyOpts || {});
      this.emitFile({
        type: "asset",
        fileName: "format.js",
        source: storyFormatTemplate({
          name,
          version,
          description,
          source: htmlTemplate({ storyFormatSource: source.code }),
        }),
      });
      delete bundle[key];
    },
  };
}
