import { cacheLife } from "next/cache";
import { HydrationCheck } from "../_components/hydration-check";

// ページ全体が事前生成されていなければビルドを失敗させる
export const ensureStatic = "navigation";

export default async function Page() {
  // ページ全体をキャッシュする。ビルド時に1回実行され、その結果の HTML が配られる。
  // 'max' は「30日たったら裏で作り直す」設定なので、厳密には ISR（別のサンプルで扱う）。
  "use cache";
  cacheLife("max");

  const renderedAt = new Date().toISOString();

  return (
    <>
      <h1>SSG（Static Site Generation）</h1>
      <p>
        ビルド時に HTML を作って置いておきます。何度リロードしても、表示される時刻はビルドした時刻のままです。
      </p>
      <dl>
        <dt>HTML を作った時刻（ビルド時）</dt>
        <dd>{renderedAt}</dd>
      </dl>
      <HydrationCheck />
    </>
  );
}
