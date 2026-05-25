'use client';

import DOMPurify from 'dompurify';

type Props = {
  content: string;
  className?: string;
};

export default function HtmlRenderer({
  content,
  className = '',
}: Props) {
  const cleanHtml = DOMPurify.sanitize(content || '', {
    ADD_TAGS: ['iframe', 'video', 'source'],
    ADD_ATTR: [
      'src',
      'controls',
      'autoplay',
      'loop',
      'muted',
      'playsinline',
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'style',
      'width',
      'height',
    ],
  });

  return (
    <div
      className={`
        blog-content
        prose 
        prose-invert 
        max-w-none 
        !text-white

        prose-headings:text-white
        prose-p:text-white
        prose-li:text-white
        prose-strong:text-white

        prose-img:rounded-2xl
        prose-img:w-full
        prose-img:h-auto

        prose-video:w-full
        prose-video:rounded-2xl

        prose-iframe:w-full

        overflow-hidden
        break-words

        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}