import { useEffect, useRef, useState } from "react";

interface Props {
  src?: string;
  /** Optional WebM with alpha channel; preferred when supplied. */
  srcWebm?: string;
  poster: string;
  posterAlt: string;
  /** Static fallback for touch / reduced motion / missing src. */
  fallbackImage?: string;
}

/**
 * Scroll-controlled background video.
 * - No autoplay; scroll position drives currentTime.
 * - Falls back to a static image on touch, reduced motion, or no src.
 * - Mount inside a `relative` parent that defines the visible video box.
 *
 * Implementation note: uses a vanilla scroll listener + getBoundingClientRect
 * instead of framer-motion's useScroll. Simpler, fewer moving parts, easier
 * to debug.
 */
export default function HeroVideoScroll({
  src,
  srcWebm,
  poster,
  posterAlt,
  fallbackImage,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [canVideo, setCanVideo] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const useStatic = !(src || srcWebm) || reduced || isTouch;

  useEffect(() => {
    if (useStatic) return;
    const video = videoRef.current;
    const trigger = triggerRef.current;
    if (!video || !trigger) return;
    video.pause();

    let raf = 0;
    const apply = () => {
      const dur = video.duration;
      if (!dur || Number.isNaN(dur) || !Number.isFinite(dur)) return;
      const rect = trigger.getBoundingClientRect();
      // Progress 0 when trigger.top === 0 (page anchored at hero top),
      // progress 1 when trigger has scrolled fully out the top.
      const range = rect.height;
      if (range <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / range));
      const t = progress * dur;
      if (Math.abs(video.currentTime - t) > 0.03) {
        try {
          video.currentTime = t;
        } catch {
          /* iOS sometimes throws if not loaded yet */
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        apply();
        raf = 0;
      });
    };

    const onMeta = () => {
      setCanVideo(true);
      apply();
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [useStatic]);

  return (
    <>
      {/* Invisible scroll trigger — half a viewport tall so the full
          video plays in ~half a screen of scroll. Top anchored to the
          video container's top so progress starts at 0 on load. */}
      <div
        ref={triggerRef}
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: 0, height: "50vh" }}
      />

      {/* Visible video, clipped to the parent. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {useStatic ? (
          <img
            src={fallbackImage ?? poster}
            alt={posterAlt}
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              poster={poster}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: canVideo ? 1 : 0,
                transition: "opacity 600ms ease",
              }}
            >
              {srcWebm && <source src={srcWebm} type="video/webm" />}
              {src && <source src={src} type="video/mp4" />}
            </video>
            {!canVideo && (
              <img
                src={poster}
                alt={posterAlt}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
