export interface ProviderMetadata {
  id: string;
  name: string;
}

const cachedMetadata: ProviderMetadata[] = [];

export function getCachedMetadata(): ProviderMetadata[] {
  return cachedMetadata;
}

export function getApiToken(): string | null {
  return null;
}

export function setApiToken(token: string): void {}
