import { CaptionListItem } from "@/stores/player/slices/source";

export function convertProviderCaption(captions: any[]): CaptionListItem[] {
  return [];
}

export function convertSubtitlesToSrt(text: string): string {
  return text;
}

export function parseVttSubtitles(text: string): any[] {
  return [];
}

export function filterDuplicateCaptionCues(cues: any[]): any[] {
  return cues;
}

export function convertSubtitlesToSrtDataurl(text: string): string {
  return "data:text/plain;base64," + btoa(text);
}

export function convertSubtitlesToObjectUrl(text: string): string {
  const blob = new Blob([text], { type: "text/vtt" });
  return URL.createObjectURL(blob);
}

export function sanitize(text: string): string {
  return text;
}

export function makeQueId(cue: any): string {
  return `${cue.start}-${cue.end}`;
}

export function parseSubtitles(text: string): any[] {
  return [];
}

export function captionIsVisible(time: number, start: number, end: number): boolean {
  return time >= start && time <= end;
}
