import { useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion } from "framer-motion";

interface Props {
  src?: string;
  poster: string;
  posterAlt: string;
  /** Used as the static fallback on touch / reduced motion / when src is missing. */
  fallbackImage?: string;
}

/**
 * Scroll-controlled background video.
 * - No autoplay; the user's scroll position drives `currentTime`.
 * - Falls back to a static image on touch devices, on prefers-reduced-motion,
 *   or when no `src` is provided yet.
 * - The component is the absolute background of its parent (parent must be relative).
 */
export default function HeroVideoScroll({
  src,
  poster,
  posterAlt,
  fallbackImage,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [canVideo, setCanVideo] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const useStatic = !src || reduced || isTouch;

  // Wire the scroll progress (0..1 across the trigger element)
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (useStatic) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    const apply = (progress: number) => {
      const dur = video.duration;
      if (!dur || Number.isNaN(dur) || !Number.isFinite(dur)) return;
      const t = Math.min(Math.max(progress, 0), 1) * dur;
      // Avoid jitter — only set if difference is meaningful
      if (Math.abs(video.currentTime - t) > 0.03) {
        try {
          video.currentTime = t;
        } catch {
          /* iOS sometimes throws if not loaded yet */
        }
      }
    };

    const onMeta = () => {
      apply(scrollYProgress.get());
      setCanVideo(true);
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    const unsubscribe = scrollYProgress.on("change", apply);
    return () => {
      unsubscribe();
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [useStatic, scrollYProgress]);

  return (
    <>
      {/* Trigger element — defines the scroll range mapped to video time.
          Sticky/absolute media inside parent will use this range. */}
      <div ref={triggerRef} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {useStatic ? (
          <img
            src={fallbackImage ?? poster}
            alt={posterAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: canVideo ? 1 : 0, transition: "opacity 600ms ease" }}
            />
            {!canVideo && (
              <img
                src={poster}
                alt={posterAlt}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
