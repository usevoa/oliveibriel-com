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
 * Autoplay-loop hero video.
 * - Plays automatically on mount, loops, muted (browser autoplay policy).
 * - Falls back to a static image on reduced-motion or missing src.
 * - Mount inside a `relative` parent that defines the visible video box.
 */
export default function HeroVideo({
  src,
  srcWebm,
  poster,
  posterAlt,
  fallbackImage,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [canVideo, setCanVideo] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const useStatic = !(src || srcWebm) || reduced;

  useEffect(() => {
    if (useStatic) return;
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => setCanVideo(true);
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    // Kick off playback (autoplay attribute should handle this, but some
    // browsers need an explicit nudge after hydration).
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [useStatic]);

  return (
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
            autoPlay
            loop
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
  );
}
