declare module '@asciidoctor/core';

declare module 'asciidoctor-kroki-embedded/html' {
  export function defaultRenderer(args: {
    diagramType: string;
    source: string;
    attrs: Record<string, string>;
    document?: unknown;
    options?: Record<string, unknown>;
  }): string;
  export function errorRenderer(args: { diagramType: string; message: string }): string;
}

declare module 'asciidoctor-numbered-captions' {
  const numberedCaptions: {
    register(registry: unknown, options?: Record<string, unknown>): void;
  };
  export default numberedCaptions;
}
