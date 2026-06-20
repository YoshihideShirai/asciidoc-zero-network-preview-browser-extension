import { asciiDocFilePattern, type StoredSource } from './types';

const alreadyHandledKey = 'asciidocZeroNetworkPreviewHandled';

void maybeOpenPreview();

async function maybeOpenPreview(): Promise<void> {
  if ((window as any)[alreadyHandledKey] || !asciiDocFilePattern.test(location.pathname)) {
    return;
  }

  const source = readRawDocumentText();
  if (!source || !looksLikeAsciiDoc(source)) {
    return;
  }

  (window as any)[alreadyHandledKey] = true;

  const response = await chrome.runtime.sendMessage({
    type: 'store-source',
    source: {
      source,
      sourceUrl: location.href,
      title: decodeURIComponent(location.pathname.split('/').pop() || 'AsciiDoc document'),
      createdAt: Date.now(),
    } satisfies StoredSource,
  });

  if (response?.sourceId) {
    location.replace(chrome.runtime.getURL(`viewer.html?sourceId=${encodeURIComponent(response.sourceId)}`));
  }
}

function readRawDocumentText(): string {
  const pre = document.body?.querySelector('pre');
  if (pre && document.body.children.length === 1) {
    return pre.textContent || '';
  }

  const bodyText = document.body?.innerText || '';
  const contentType = document.contentType || '';
  return /^text\/plain\b/i.test(contentType) ? bodyText : '';
}

function looksLikeAsciiDoc(source: string): boolean {
  return /^(=|\[[a-z0-9_-]+\]|include::|image::|:[a-z0-9_-]+:|\w+::)/im.test(source);
}
