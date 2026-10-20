import { connection } from "next/server";
import { Suspense } from "react";
import { HydrationCheck } from "../_components/hydration-check";
import { sleep } from "../_lib/sleep";

// /ssr と同じく、ページ全体をリクエスト時に描画する（事前生成はしない）。
// 違いは、遅い部分を <Suspense> で囲んでいること。
export const instant = false;

async function SlowSection({ seconds }: { seconds: number }) {
  await sleep(seconds * 1000);
  return (
    <dl>
      <dt>{seconds}秒かかる部分</dt>
      <dd>{new Date().toISOString()}</dd>
    </dl>
  );
}

export default async function Page() {
  await connection();
  const renderedAt = new Date().toISOString();

  // Suspense の外はすぐに送られ、中身は fallback で仮置きされる。
  // 遅い部分は、できあがった順に同じレスポンスの続きとして送られる。
  return (
    <>
      <h1>Streaming SSR</h1>
      <p>
        リクエストのたびにサーバーで HTML を作ります。SSR と違い、全部できあがるのを待たずに、できた部分から順に送ります。
      </p>
      <dl>
        <dt>最初に送った時刻</dt>
        <dd>{renderedAt}</dd>
      </dl>
      <Suspense fallback={<p>1秒かかる部分を読み込み中…</p>}>
        <SlowSection seconds={1} />
      </Suspense>
      <Suspense fallback={<p>3秒かかる部分を読み込み中…</p>}>
        <SlowSection seconds={3} />
      </Suspense>
      <HydrationCheck />
    </>
  );
}
