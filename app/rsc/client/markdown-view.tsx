"use client";

import { marked } from "marked";
import { markdown } from "../content";

// クライアントの部品で変換する。ハイドレーションでもう一度変換するので、marked の JS もブラウザに送られる。
export function MarkdownView() {
  const html = marked.parse(markdown, { async: false });

  // 自前の固定文字列を変換した HTML なので、そのまま埋め込んでいる
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}
