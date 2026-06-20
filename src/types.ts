export type PreviewWidth = 'default' | 'window';

export type StoredSource = {
  source: string;
  sourceUrl?: string;
  title?: string;
  createdAt: number;
};

export type PreviewSettings = {
  previewWidth: PreviewWidth;
  allowedPreviewHosts: string[];
};

export const defaultSettings: PreviewSettings = {
  previewWidth: 'default',
  allowedPreviewHosts: [],
};

export const asciiDocFilePattern = /\.(adoc|asciidoc|asc|ad)(?:[?#].*)?$/i;
