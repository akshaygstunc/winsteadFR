'use client';

import DOMPurify from 'dompurify';

type Props = {
    content: string;
    className?: string;
};

export default function HtmlRenderer({ content, className }: Props) {
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
        ],
    });

    return (
        <div
            className={`prose max-w-none text-white 
        prose-strong:text-inherit prose-strong:text-white
        prose-video:w-full prose-video:rounded-xl
        prose-iframe:w-full prose-iframe:aspect-video
        ${className}`}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
}