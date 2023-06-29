import "github-markdown-css/github-markdown.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMyState } from "../states";

export default function RightMarkdown() {
  const { snap } = useMyState();
  const [content, setContent] = useState("# Hello World");

  function getApiMarkdown(openapi: any, key1: string) {
    let item = undefined;
    Object.entries(openapi.paths).forEach(([key, value]: any) => {
      if (key1 == key) item = value;
    });
    if (!item) return "### Not Found";
    const method = Object.keys(item)[0];
    const description = item[method]["description"];
    const params =
      item[method]["requestBody"]["content"][
        "application/x-www-form-urlencoded"
      ]["schema"]["properties"];
    let paramsMarkdown = "";
    Object.entries(params).forEach(([key, value]: any) => {
      paramsMarkdown += `| ${key} | ${value["type"]} | ${
        value["required"] ? "Y" : ""
      } | ${value["description"] || ""} |\n`;
    });
    return `
## \`${key1}\`
> ${description || ""}

### Method
- \`${method}\`

### Params

| key      | type   | required | comment |
| -------- | ------ | -------- | ------- |
${paramsMarkdown}

### Response

\`\`\`json
{
  "code": 0,
}
\`\`\``;
  }

  // function getEnumMarkdown(openapi: any) {
  //   return "";
  // }

  function getDBMarkdown(openapi: any, key1: string) {
    let item: any = undefined;
    Object.entries(openapi.components.schemas).forEach(([key, value]: any) => {
      if (key1 == key) item = value;
    });
    if (!item) return "### Not Found";
    const description = item["description"];
    let fieldsMarkdown = "";
    Object.entries(item.properties).forEach(([key, value]: any) => {
      fieldsMarkdown += `| ${key} | ${value["type"]} | | | | ${
        value["required"] ? "Y" : ""
      }| | ${value["description"] || ""} |\n`;
    });

    return `
## \`${key1}\`
> ${description || ""}

| filed | type | length | precision | scale | not_null | default | comment |
| -------- | ------ | -------- | ------- | ------- | ------- | ------- | ------- |
${fieldsMarkdown}
`;
  }

  useEffect(() => {
    console.log(
      "RightMarkdown::useEffect",
      snap.session.type,
      snap.session.key
    );
    const openapi = snap.session.openapi;
    const type = snap.session.type;
    const key = snap.session.key;
    switch (type) {
      case "api":
        setContent(getApiMarkdown(openapi, key));
        break;
      case "enum":
        break;
      case "db":
        setContent(getDBMarkdown(openapi, key));
        break;
      case "doc":
        break;
    }
  }, [snap.session.key, snap.session.openapi]);

  return (
    <div style={{ padding: "20px" }}>
      <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
