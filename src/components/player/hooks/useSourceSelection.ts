export function useEmbedScraping(
  routerId: string,
  sourceId: string,
  url: string,
  embedId: string,
) {
  return {
    run: () => {},
    loading: false,
    errored: false,
  };
}

export function useSourceScraping(sourceId: string | null, routerId: string) {
  return {
    run: () => {},
    watching: true,
    loading: false,
    items: undefined,
    notfound: false,
    errored: false,
  };
}
