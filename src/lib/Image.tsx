"use client";
import NextImage, { ImageProps } from "@/src/lib/NextImage";
import { useEffect, useState } from "react";

export default function Image({
  src,
  alt,
  quality = 75,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
 useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src]);
   return hasError ? (
    <div
      className={`bg-gray-800 flex items-center justify-center ${props.className}`}
      style={{ width: props.width, height: props.height }}
    >
      <span className="text-gray-500 text-xs">No Image</span>
    </div>
  ) : (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      quality={quality}
      loading={props.priority ? undefined : loading}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  );
}
