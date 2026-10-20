# astro-islands

Islands Architecture のサンプルです（Astro 7.4 ＋ Vue 3）。
ページは静的な HTML のままにして、動く部品（島）だけを個別にハイドレーションします。

```bash
npm install
npm run build     # dist/ に静的な HTML を出力する
npm run preview   # http://localhost:4321
```

## ページ

| ページ | 内容 |
|---|---|
| `/` | 同じ Vue の部品（`src/components/Counter.vue`）を、指定なし・`client:load`・`client:visible` で3回置く |
| `/static` | 同じ部品を、指定なしで1回だけ置く |

ハイドレーションの指定（client directive）は次のとおりです。

| 指定 | 動き |
|---|---|
| なし | サーバーで HTML にするだけ。JS は送らない |
| `client:load` | ページを読み込んだら、すぐに JS を取りに行ってハイドレーションする |
| `client:visible` | 画面に入ったときに JS を取りに行ってハイドレーションする |
| `client:idle` | ブラウザの手が空いたときにハイドレーションする |
| `client:media` | メディアクエリに合ったときにハイドレーションする |
| `client:only` | サーバーでは描画せず、ブラウザでだけ描画する（CSR） |

## 送られる JS（ビルド結果を計測）

| ページ | JS |
|---|---|
| `/static` | 0（`<script>` が1つもない） |
| `/` | インラインの島の起動処理 gzip 2.3KB ＋ 島の JS 3ファイル gzip 28.4KB |

島の JS の内訳は、Vue の本体 24.7KB、Astro の Vue 用の起動処理 3.3KB、`Counter` 0.5KB です（いずれも gzip）。

- 比較: Next.js 側のトップページ（文章とリンクだけ）は、gzip で約174KB の JS を読み込みます
- `/` では2つの島が同じ部品なので、ファイルは1回しか読み込まれません。`client:visible` で遅らせられるのは、ハイドレーションの実行です。別の部品なら、その部品の JS の読み込み自体も、見えるまで遅れます
- 指定なしの部品は、ブラウザでは動かないので、ハイドレーションは「未完了」のまま、ボタンも反応しません
