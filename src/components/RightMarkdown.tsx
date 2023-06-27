import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function RightMarkdown() {
  const content = `
  # Hello World
  
  This is a **Markdown** document with "quotes".
  
  - Item 1
  - Item 2
  `;
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
}
