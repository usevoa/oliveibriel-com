import { useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion } from "framer-motion";

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
 * - No autoplay; scroll position drives currentTime via framer-motion.
 * - Falls back to a static image on touch, reduced motion, or no src.
 * - Trigger ref defines the scroll range; mount inside a relative parent.
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
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [canVideo, setCanVideo] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const useStatic = !(src || srcWebm) || reduced || isTouch;

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
    <div
      ref={triggerRef}
      aria-hidden="true"
      className="absolute left-0 right-0 overflow-visible pointer-events-none"
      // Modest scroll-range extension below the video so progress maps to
      // a slightly longer scroll than the visible card alone. Tune the
      // bottom offset (in vh) to control playback speed.
      style={{ top: 0, bottom: "-15vh" }}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ bottom: "15vh" }}>
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
    </div>
  );
}
