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
            className={className}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
}