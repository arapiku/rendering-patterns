"use client";

import { useEffect, useState } from "react";

type Now = { now: string };

// useEffect はブラウザでしか動かないので、取得も描画もブラウザで行われる。
// サーバーで作った HTML には「読み込み中…」しか入らない。
export function ClientClock() {
  const [data, setData] = useState<Now | null>(null);

  useEffect(() => {
    fetch("/api/now")
      .then((res) => res.json() as Promise<Now>)
      .then(setData);
  }, []);

  return (
    <dl>
      <dt>API から取得した時刻</dt>
      <dd>{data ? data.now : "読み込み中…"}</dd>
    </dl>
  );
}
