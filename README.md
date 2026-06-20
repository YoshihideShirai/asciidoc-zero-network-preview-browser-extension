# AsciiDoc Zero-Network Preview for Chrome and Edge

Chrome / Edge browser extension version of
[`YoshihideShirai/asciidoc-local-preview-vscode`](https://github.com/YoshihideShirai/asciidoc-local-preview-vscode).

It previews `.adoc`, `.ad`, `.asciidoc`, and `.asc` files with bundled local assets. The preview path does not use CDNs, Kroki servers, or remote diagram services.

## Features

- Detects raw AsciiDoc documents opened in Chrome or Edge and redirects them to the extension viewer.
- Provides an explicit **Open** button for local file selection.
- Converts AsciiDoc in the browser with Asciidoctor.js.
- Renders MathJax, Mermaid, PlantUML, Nomnoml, Vega, Vega-Lite, WaveDrom, and Bytefield with bundled assets.
- Supports `emoji:name[]` as local Unicode emoji.
- Applies chapter-aware numbered captions through `asciidoctor-numbered-captions`.
- Blocks remote images by default, with exact-host allowlisting in the options page.
- Installs browser network API guards before bundled preview renderer scripts load.

## Development

```sh
npm install
npm run test
```

`npm run test` runs TypeScript checks, builds `dist/`, and runs the no-network audit.

## Load the Extension

1. Run `npm run build`.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable developer mode.
4. Load unpacked extension from the generated `dist/` directory.
5. For local `file://` previews, enable **Allow access to file URLs** for this extension.

## Browser Notes

The browser extension cannot read arbitrary sibling files from an already opened document unless the browser grants that file access path. Inline diagram blocks are fully supported; local diagram file macros are reported as unavailable in the viewer instead of silently reading from disk.

Remote images remain blocked unless their exact host is listed in the extension options.
