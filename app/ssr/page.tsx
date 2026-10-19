import { connection } from "next/server";
import { HydrationCheck } from "../_components/hydration-check";

// Cache Components では、ページの一部でも事前生成できるように作るのが基本。
// ここでは比較のため、ページ全体をリクエスト時まで待たせる従来の SSR にしている。
// instant = false がないと、「事前生成できる部分がない」としてビルドが失敗する。
export const instant = false;

export default async function Page() {
  // ここから先はリクエストが来てから実行される
  await connection();
  const renderedAt = new Date().toISOString();

  return (
    <>
      <h1>SSR（Server-Side Rendering）</h1>
      <p>
        リクエストのたびにサーバーで HTML を作ります。サーバーから届く HTML に、その時点の時刻が入っています。
      </p>
      <dl>
        <dt>サーバーで HTML を作った時刻</dt>
        <dd>{renderedAt}</dd>
      </dl>
      <HydrationCheck />
    </>
  );
}
