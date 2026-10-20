# qwik-resumability

Resumability のサンプルです（Qwik 1.20 / Qwik City）。
ハイドレーションをせず、サーバーが状態とイベントの登録先を HTML に埋め込んでおき、操作された瞬間にその処理の JS だけを取りに行って再開します。

```bash
npm install
npm run build
npm run build.preview
npx vite preview --port 4173   # http://localhost:4173
```

`npm run preview` でも動きますが、ブラウザが自動で開きます。

## HTML に埋め込まれるもの

ボタン1つ（`src/components/counter/counter.tsx`）のページを、本番ビルドで配信した HTML の抜粋です。

```html
<button type="button" on:click="q-BDH9dyfm.js#s_0nR11qYmWOc[0]">押した回数: 0</button>

<script type="qwik/json">{"refs":{"7":"0"},"objs":["\u00121",0,"\u00110 @1","#8"],"subs":[["3 #8 2 #8"]]}</script>
```

- `on:click` に入っているのは、処理そのものではなく「押されたら `q-BDH9dyfm.js` の `s_0nR11qYmWOc` を読み込んで実行せよ」という住所です
- `qwik/json` に、カウンターの値（`0`）と、値が変わったらどこを書き換えるか（購読関係）が入っています。ブラウザはこれを読むだけで続きから再開でき、部品をもう一度実行する必要がありません
- コード中の `$`（`component$`・`onClick$`）は、「ここでコードを分割して、必要になったときに読み込む」という印です

## 送られる JS（ビルド結果を計測）

| タイミング | ファイル | gzip | 実行するか |
|---|---|---|---|
| 読み込み時 | イベントを受け取る係（qwikloader） | 1.6KB | 実行する |
| 読み込み時 | 先読み係（preloader）と依存関係の表 | 2.5KB | 実行する |
| 読み込み時 | Qwik の本体（`modulepreload`） | 19.7KB | 取得だけで、実行しない |
| ブラウザの手が空いたとき | クリックの処理など | 1.3KB | 取得だけで、実行しない |
| ボタンを押したとき | クリックの処理と Qwik の本体 | ― | ここで初めて実行する |

- 読み込み時に実行される JS は約4KB です。部品のコードは、押されるまで1行も実行されません
- ダウンロード量はゼロではありません。押されたときに待たせないよう、Qwik の本体やクリックの処理を先読みしています。Resumability で消えるのは、ダウンロードではなく「読み込み時に部品を実行し直す処理」（ハイドレーション）です
