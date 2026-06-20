import { saveSource } from './storage';
import type { StoredSource } from './types';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== 'store-source') {
    return false;
  }

  void saveSource(message.source as StoredSource)
    .then((sourceId) => sendResponse({ sourceId }))
    .catch((error) => sendResponse({ error: String(error instanceof Error ? error.message : error) }));

  return true;
});

chrome.action.onClicked.addListener(() => {
  void chrome.tabs.create({ url: chrome.runtime.getURL('viewer.html') });
});
