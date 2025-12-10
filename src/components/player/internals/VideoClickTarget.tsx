import classNames from "classnames";
import { PointerEvent, useCallback, useEffect } from "react";
import { useEffectOnce, useTimeoutFn } from "react-use";

import { useShouldShowVideoElement } from "@/components/player/internals/VideoContainer";
import { PlayerHoverState } from "@/stores/player/slices/interface";
import { usePlayerStore } from "@/stores/player/store";

export function VideoClickTarget(props: { showingControls: boolean }) {
  const show = useShouldShowVideoElement();
  const display = usePlayerStore((s) => s.display);
  const isPaused = usePlayerStore((s) => s.mediaPlaying.isPaused);
  const updateInterfaceHovering = usePlayerStore(
    (s) => s.updateInterfaceHovering,
  );
  const hovering = usePlayerStore((s) => s.interface.hovering);
  const isSeeking = usePlayerStore((s) => s.interface.isSeeking);
  const [_, cancel, reset] = useTimeoutFn(() => {
    updateInterfaceHovering(PlayerHoverState.NOT_HOVERING);
  }, 3000);
  useEffectOnce(() => {
    cancel();
  });

  // Cancel the timeout when user is seeking/dragging to keep controls visible
  // Restart the timeout when seeking ends
  useEffect(() => {
    if (isSeeking) {
      cancel();
    } else if (hovering === PlayerHoverState.MOBILE_TAPPED) {
      // Restart timeout after seeking ends on mobile
      reset();
    }
  }, [isSeeking, hovering, cancel, reset]);

  const toggleFullscreen = useCallback(() => {
    display?.toggleFullscreen();
  }, [display]);

  const togglePause = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      // pause on mouse click
      if (e.pointerType === "mouse") {
        if (e.button !== 0) return;
        if (isPaused) display?.play();
        else display?.pause();
        return;
      }

      // toggle on other types of clicks
      if (hovering !== PlayerHoverState.MOBILE_TAPPED) {
        updateInterfaceHovering(PlayerHoverState.MOBILE_TAPPED);
        reset();
      } else {
        updateInterfaceHovering(PlayerHoverState.NOT_HOVERING);
        cancel();
      }
    },
    [display, isPaused, hovering, updateInterfaceHovering, reset, cancel],
  );

  if (!show) return null;

  return (
    <div
      className={classNames("absolute inset-0", {
        "absolute inset-0": true,
        "cursor-none": !props.showingControls,
      })}
      onDoubleClick={toggleFullscreen}
      onPointerUp={togglePause}
    />
  );
}
