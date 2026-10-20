import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  const count = useSignal(0);

  // onClick$ の $ は「ここでコードを分割して、押されたときに読み込む」という印。
  // ページを開いた時点では、この部品のコードはブラウザで1行も実行されない。
  return (
    <button type="button" onClick$={() => count.value++}>
      押した回数: {count.value}
    </button>
  );
});
