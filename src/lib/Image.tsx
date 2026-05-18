"use client";
import NextImage, { ImageProps } from "@/src/lib/NextImage";
import { useState } from "react";

export default function Image({
  src,
  alt,
  quality = 75,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NextImage
      {...props}
      src={typeof imgSrc === "string" ? imgSrc : imgSrc}
      alt={alt}
      quality={quality}
      loading={props.priority ? undefined : loading}
      sizes={sizes}
      onError={() => setImgSrc("/placeholder.webp")}
    />
  );
}