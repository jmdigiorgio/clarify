// utils/markdown.js
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export async function parseMarkdown(markdown) {
  try {
    const result = await remark().use(remarkHtml).process(markdown);
    return result.toString();
  } catch (error) {
    console.error('Error parsing markdown:', error);
    throw error;
  }
}
