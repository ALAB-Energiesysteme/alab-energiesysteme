"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
  /** Mindestabstand vor dem Viewport, in dem das Video schon zu laden beginnt. */
  rootMargin?: string;
}

/**
 * Lädt und startet ein Video erst, sobald es ins Viewport scrollt.
 * Reduziert die initiale Page-Last bei großen Hintergrund-Videos massiv.
 */
export default function LazyVideo({
  src,
  className,
  poster,
  rootMargin = "200px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wenn IntersectionObserver nicht verfügbar (sehr alte Browser), lade direkt.
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  // Wenn Video sichtbar wird, autoplay aktivieren
  useEffect(() => {
    if (!shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    const play = () => {
      el.play().catch(() => {
        /* autoplay blockiert – User muss interagieren */
      });
    };
    el.addEventListener("loadeddata", play, { once: true });
    return () => el.removeEventListener("loadeddata", play);
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay={shouldLoad}
      preload={shouldLoad ? "metadata" : "none"}
      poster={poster}
      className={className}
      src={shouldLoad ? src : undefined}
    />
  );
}
