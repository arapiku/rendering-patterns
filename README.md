# rendering-patterns

CSR・SSR・SSG などのレンダリング方式を、Next.js 16 で書き分けて比べるサンプルです。
どのページも「時刻を表示するだけ」にそろえて、方式の違いだけが見えるようにしています。

- Next.js 16.4.2（App Router）/ React 19.3
- Cache Components 有効（`create-next-app` の初期設定のまま）

## 動かし方

違いは本番ビルドでしか正しく見えません。`next dev` ではビルド時の事前生成が行われないためです。

```bash
npm install
npm run build   # ルート表の記号で、各ページがどう作られたか分かる
npm start       # http://localhost:3000
```

## 観察のしかた

| 見るもの | 方法 |
|---|---|
| HTML がいつ作られたか | ページをリロードして、表示される時刻が変わるか見る |
| 最初に届く HTML の中身 | `curl -s http://localhost:3000/<path>` で、時刻が HTML に入っているか見る |
| ハイドレーション | `curl` の結果では「未完了」、ブラウザでは「完了」になる。ボタンは完了後にだけ反応する |

## CSR（`/csr`）

中身をブラウザで JS が描画します。

- `app/csr/client-clock.tsx` は `"use client"` のコンポーネントで、`useEffect` の中で `/api/now` から時刻を取得します
- `useEffect` はブラウザでしか動かないので、サーバーの HTML には「読み込み中…」しか入りません
- ページの枠（見出しや説明文）はビルド時に事前生成されます。App Router では「ページ全体が空の HTML」にはならず、データの部分だけがブラウザで描画されます

| 観察 | 結果 |
|---|---|
| リロード | 時刻が毎回変わる |
| `curl` | 時刻は入っておらず「読み込み中…」 |
