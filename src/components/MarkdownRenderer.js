"use client"; // Add this directive

import { useEffect, useState } from 'react';
import { parseMarkdown } from '../utils/markdown';

export default function MarkdownRenderer({ markdown }) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const renderMarkdown = async () => {
      const html = await parseMarkdown(markdown);
      setHtmlContent(html);
    };

    renderMarkdown();
  }, [markdown]);

  return (
    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
