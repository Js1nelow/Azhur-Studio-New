import React, { useState, useRef, useEffect } from 'react';

type LazyVideoProps = React.ComponentPropsWithoutRef<'video'> & {
  src: string;
  poster?: string;
  autoPlayVisible?: boolean;
};

export function LazyVideo({ src, poster, autoPlayVisible = true, className, ...props }: LazyVideoProps) {
  const [isIntersecting, setIntersecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (autoPlayVisible && videoRef.current) {
            videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
          }
        } else {
          if (autoPlayVisible && videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: '60px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlayVisible]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      {...props}
      preload={isIntersecting ? "metadata" : "none"}
      autoPlay={false}
    >
      {isIntersecting && <source src={src} type="video/mp4" />}
    </video>
  );
}
