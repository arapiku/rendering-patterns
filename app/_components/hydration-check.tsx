"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};

// サーバーで作った HTML には「未完了」と書かれ、
// ブラウザでハイドレーションが終わると「完了」に切り替わる。
export function HydrationCheck() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [count, setCount] = useState(0);

  return (
    <dl>
      <dt>ハイドレーション</dt>
      <dd>{hydrated ? "完了" : "未完了"}</dd>
      <dt>ボタン</dt>
      <dd>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          押した回数: {count}
        </button>
      </dd>
    </dl>
  );
}
