import { getSettings, saveSettings } from './storage';
import { normalizeGitLabHosts } from './gitlab-hosts';
import type { PreviewWidth } from './types';

const widthSelect = document.querySelector<HTMLSelectElement>('#preview-width');
const hostsTextarea = document.querySelector<HTMLTextAreaElement>('#allowed-hosts');
const gitlabHostsTextarea = document.querySelector<HTMLTextAreaElement>('#allowed-gitlab-hosts');
const saveButton = document.querySelector<HTMLButtonElement>('#save');
const status = document.querySelector<HTMLElement>('#status');

void load();

async function load(): Promise<void> {
  const settings = await getSettings();
  if (widthSelect) {
    widthSelect.value = settings.previewWidth;
  }
  if (hostsTextarea) {
    hostsTextarea.value = settings.allowedPreviewHosts.join('\n');
  }
  if (gitlabHostsTextarea) {
    gitlabHostsTextarea.value = settings.allowedGitLabHosts.join('\n');
  }
}

saveButton?.addEventListener('click', () => {
  void save();
});

async function save(): Promise<void> {
  await saveSettings({
    previewWidth: widthSelect?.value === 'window' ? 'window' : ('default' satisfies PreviewWidth),
    allowedPreviewHosts: (hostsTextarea?.value || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
    allowedGitLabHosts: normalizeGitLabHosts((gitlabHostsTextarea?.value || '').split(/\r?\n/)),
  });

  if (status) {
    status.textContent = 'Saved.';
    window.setTimeout(() => {
      status.textContent = '';
    }, 1800);
  }
}
