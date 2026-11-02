import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  opacity?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  playbackRate?: number;
}

export const VideoBackground = ({
  videoSrc,
  opacity = 0.35,
  overlay = true,
  overlayColor = 'from-NEXO-navy/95 via-NEXO-navy/80 to-NEXO-navy/95',
  overlayOpacity = 0.85,
  playbackRate = 0.8
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-cyan-100" />

      {/* Overlay gradiente para melhor legibilidade */}
      {overlay && (
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Overlay adicional para criar profundidade */}
      <div className="absolute inset-0 bg-NEXO-navy/20" />
    </div>
  );
};
