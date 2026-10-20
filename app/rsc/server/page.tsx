import { marked } from "marked";
import { markdown } from "../content";

// サーバーの部品で変換する。marked はサーバーでだけ動き、ブラウザには変換後の HTML だけが届く。
export default function Page() {
  const html = marked.parse(markdown, { async: false });

  return (
    <>
      <h1>RSC: サーバーの部品で変換</h1>
      {/* 自前の固定文字列を変換した HTML なので、そのまま埋め込んでいる */}
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
