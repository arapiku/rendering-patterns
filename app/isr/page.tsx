import { cacheLife } from "next/cache";
import { HydrationCheck } from "../_components/hydration-check";

export default async function Page() {
  // SSG と同じくページ全体をキャッシュし、作り直すまでの期限だけを短くする。
  // - revalidate: 10秒たったら、次のアクセスをきっかけに裏で作り直す（そのアクセスには古い版を返す）
  // - expire: 1時間アクセスがなければ、次のアクセスは作り直しを待つ
  // - stale: ブラウザ側で使い回す時間。30秒未満にすると事前生成の対象から外れる
  "use cache";
  cacheLife({ stale: 30, revalidate: 10, expire: 3600 });

  const renderedAt = new Date().toISOString();

  return (
    <>
      <h1>ISR（Incremental Static Regeneration）</h1>
      <p>
        ビルド時に HTML を作り、10秒の期限が過ぎたら、次のアクセスをきっかけに裏で作り直します。
        期限切れの後の最初のリロードでは古い時刻のまま、その次のリロードで新しい時刻に変わります。
      </p>
      <dl>
        <dt>HTML を作った時刻</dt>
        <dd>{renderedAt}</dd>
      </dl>
      <HydrationCheck />
    </>
  );
}
