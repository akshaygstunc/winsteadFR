'use client';

import DOMPurify from 'dompurify';

type Props = {
    content: string;
    className?: string;
};

export default function HtmlRenderer({ content, className }: Props) {
    const cleanHtml = DOMPurify.sanitize(content || '');

    return (
        <div
            className={`prose max-w-none text-white prose-strong:text-inherit prose-strong:text-white ${className}`}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
}