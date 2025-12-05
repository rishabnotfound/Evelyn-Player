export interface LoadableSource {
  type: "hls" | "mp4";
  url: string;
  quality?: {
    id: string;
    label: string;
  };
}

export function selectQuality(source: LoadableSource): LoadableSource {
  return source;
}

export function allQualities(source: LoadableSource): any[] {
  return [];
}

export function qualityToString(quality: any): string {
  return quality?.label ?? "Auto";
}

export function getPreferredQuality(qualities: any[]): any {
  return null;
}
