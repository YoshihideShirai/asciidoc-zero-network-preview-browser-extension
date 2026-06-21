export function normalizeGitLabHostInput(input: string): string | undefined {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed || /[\s*@]/.test(trimmed)) {
    return undefined;
  }

  if (/^http:\/\//i.test(trimmed)) {
    return undefined;
  }

  const value = /^https:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    return undefined;
  }

  return url.host;
}

export function normalizeGitLabHosts(inputs: string[]): string[] {
  const hosts = inputs.map((input) => normalizeGitLabHostInput(input)).filter((host): host is string => Boolean(host));
  return [...new Set(hosts)];
}

export function isAllowedGitLabHost(host: string, allowedHosts: string[]): boolean {
  const normalizedHost = normalizeGitLabHostInput(host);
  return Boolean(normalizedHost && normalizeGitLabHosts(allowedHosts).includes(normalizedHost));
}
