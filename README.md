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
