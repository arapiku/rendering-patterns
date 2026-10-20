import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Counter } from "../components/counter/counter";

export default component$(() => {
  return (
    <main>
      <h1>Resumability（Qwik）</h1>
      <p>
        ハイドレーションをしません。サーバーが状態とイベントの登録先を HTML
        に埋め込んでおき、ブラウザはボタンが押された瞬間に、その処理の JS
        だけを取りに行って再開します。
      </p>
      <Counter />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Resumability",
  meta: [
    {
      name: "description",
      content: "Qwik で Resumability を確かめるサンプル",
    },
  ],
};
