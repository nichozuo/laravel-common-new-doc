import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMyState } from "../states";

const md = `
# Hello World

This is a **Markdown** document with "quotes".

- Item 1
- Item 2
`;

export default function RightMarkdown() {
  const { snap } = useMyState();
  const [content, setContent] = useState(() => md);

  useEffect(() => {
    // console.log("type", snap.session.type);
    // console.log("key", snap.session.key);

    if (snap.session.key === "") {
      setContent(md);
    }
  }, [snap.session.type, snap.session.key]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
}
