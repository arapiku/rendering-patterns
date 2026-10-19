import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Rendering Patterns</h1>
      <p>
        同じ「時刻を表示するだけのページ」を、方式を変えて作っています。
        各ページでリロードしたときの時刻の変わり方と、ページのソース（HTML）に何が入っているかを比べてください。
      </p>
      <ul>
        <li>
          <Link href="/csr">CSR</Link>: ブラウザで JS が中身を描画する
        </li>
        <li>
          <Link href="/ssr">SSR</Link>: リクエストのたびにサーバーで HTML を作る
        </li>
        <li>
          <Link href="/ssg">SSG</Link>: ビルド時に HTML を作って置いておく
        </li>
      </ul>
    </>
  );
}
