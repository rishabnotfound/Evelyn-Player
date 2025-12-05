import { useEffect } from "react";
import { Player } from "@/components/player";
import { useShouldShowControls } from "@/components/player/hooks/useShouldShowControls";
import { usePlayer } from "@/components/player/hooks/usePlayer";
import { playerStatus } from "@/stores/player/slices/source";
import { usePlayerStore } from "@/stores/player/store";
import { SettingsRouter } from "@/components/player/atoms/Settings";
import { ThumbnailScraper } from "@/components/player/internals/ThumbnailScraper";
import { usePreferencesStore } from "@/stores/preferences";

declare global {
  interface Window {
    __PLAYER_CONFIG__?: {
      stream: {
        url: string;
        name: string;
        type: 'hls' | 'mp4';
        captions?: Array<{
          id: string;
          language: string;
          label: string;
          url: string;
          type: string;
        }>;
      };
      meta: {
        title: string;
        description?: string;
      };
      settings: {
        defaultVolume: number;
        autoPlay: boolean;
        startTime: number;
      };
    };
  }
}

export function StandalonePlayer() {
  const { showTargets, showTouchTargets } = useShouldShowControls();
  const setEnableThumbnails = usePreferencesStore((s) => s.setEnableThumbnails);

  useEffect(() => {
    setEnableThumbnails(true);
  }, [setEnableThumbnails]);
  const status = usePlayerStore((s) => s.status);
  const isLoading = usePlayerStore((s) => s.mediaPlaying.isLoading);
  const { playMedia, setMeta } = usePlayer();

  useEffect(() => {
    const config = window.__PLAYER_CONFIG__;
    if (!config) {
      console.error('Player configuration not found. Make sure config.js is loaded.');
      return;
    }

    setMeta({
      type: 'movie',
      title: config.meta.title,
      tmdbId: 'standalone-video',
    });

    const source = {
      type: config.stream.type,
      url: config.stream.url,
    };

    const captions = config.stream.captions?.map(cap => ({
      id: cap.id,
      language: cap.language,
      hasCorsRestrictions: false,
      url: cap.url,
      type: cap.type as 'srt' | 'vtt',
    })) || [];

    setTimeout(() => {
      playMedia(
        source as any,
        captions,
        config.stream.name,
        config.settings.startTime
      );
    }, 100);
  }, []);

  return (
    <Player.Container showingControls={showTargets}>
      <Player.BlackOverlay
        show={showTargets && status === playerStatus.PLAYING}
      />
      <Player.SubtitleView controlsShown={showTargets} />

      {status === playerStatus.PLAYING ? (
        <>
          <Player.CenterControls>
            <Player.LoadingSpinner />
          </Player.CenterControls>
        </>
      ) : null}

      <Player.CenterMobileControls
        className="text-white"
        show={showTouchTargets && status === playerStatus.PLAYING}
      >
        <Player.SkipBackward iconSizeClass="text-3xl" />
        <Player.Pause
          iconSizeClass="text-5xl"
          className={isLoading ? "opacity-0" : "opacity-100"}
        />
        <Player.SkipForward iconSizeClass="text-3xl" />
      </Player.CenterMobileControls>

      <Player.TopControls show={showTargets}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Player.Title />
          </div>
        </div>
      </Player.TopControls>

      <Player.BottomControls show={showTargets}>
        <div className="flex items-center justify-center space-x-3 h-full">
          {status === playerStatus.PLAYING ? (
            <>
              <Player.ProgressBar />
            </>
          ) : null}
        </div>
        <div className="hidden lg:flex justify-between" dir="ltr">
          <Player.LeftSideControls>
            {status === playerStatus.PLAYING ? (
              <>
                <Player.Pause />
                <Player.SkipBackward />
                <Player.SkipForward />
                <Player.Volume />
                <Player.Time />
              </>
            ) : null}
          </Player.LeftSideControls>
          <div className="flex items-center space-x-3">
            {status === playerStatus.PLAYING ? (
              <>
                <Player.Pip />
                <Player.Captions />
                <Player.Settings />
              </>
            ) : null}
            <Player.Fullscreen />
          </div>
        </div>
        <div className="grid grid-cols-[2.5rem,1fr,2.5rem] gap-3 lg:hidden">
          <div />
          <div className="flex justify-center space-x-3">
            {status === playerStatus.PLAYING ? (
              <>
                <Player.Pip />
                <Player.Settings />
              </>
            ) : null}
          </div>
          <div>
            <Player.Fullscreen />
          </div>
        </div>
      </Player.BottomControls>

      <Player.VolumeChangedPopout />
      <SettingsRouter />
      <ThumbnailScraper />
    </Player.Container>
  );
}
