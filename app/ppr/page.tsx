import { cookies } from "next/headers";
import { Suspense } from "react";
import { HydrationCheck } from "../_components/hydration-check";
import { addToCart, changePrice } from "./actions";
import { getPrice, getStock } from "./data";

// 殻: キャッシュされたデータだけを使うので、ビルド時に事前生成される
async function Price() {
  const { price, fetchedAt } = await getPrice();
  return (
    <dl>
      <dt>価格</dt>
      <dd>{price.toLocaleString("ja-JP")}円</dd>
      <dt>DB から読んだ時刻</dt>
      <dd>{fetchedAt}</dd>
    </dl>
  );
}

// 穴: 全員同じだが、常に最新が必要なのでリクエストのたびに作る
async function Stock() {
  const { stock, checkedAt } = await getStock();
  return (
    <dl>
      <dt>在庫数</dt>
      <dd>{stock}点</dd>
      <dt>確認した時刻</dt>
      <dd>{checkedAt}</dd>
    </dl>
  );
}

// 穴: ユーザーごとに違うので、リクエストのたびに Cookie から作る
async function Cart() {
  const count = Number((await cookies()).get("cart")?.value ?? "0");
  return (
    <dl>
      <dt>カートの中身</dt>
      <dd>{count}点</dd>
    </dl>
  );
}

export default function Page() {
  return (
    <>
      <h1>PPR（Partial Prerendering）</h1>
      <p>
        1ページの中で、静的な殻はビルド時に事前生成し、動的な穴だけをリクエスト時に流し込みます。
        殻はすぐに届き、穴は Streaming で後から届きます。
      </p>

      <section>
        <h2>商品名・説明文（殻 / SSG）</h2>
        <p>
          <strong>Rendering Patterns Tシャツ</strong>
          <br />
          胸に CSR・SSR・SSG の図をあしらった、綿100%の Tシャツです。
        </p>
      </section>

      <section>
        <h2>価格（殻 / ISR ＋ updateTag）</h2>
        <Price />
        <form action={changePrice}>
          <button type="submit">価格を100円上げる</button>
        </form>
      </section>

      <section>
        <h2>在庫数（穴 / リクエストのたび）</h2>
        <Suspense fallback={<p>在庫を確認中…</p>}>
          <Stock />
        </Suspense>
      </section>

      <section>
        <h2>カートの中身（穴 / ユーザーごと）</h2>
        <Suspense fallback={<p>カートを読み込み中…</p>}>
          <Cart />
        </Suspense>
        <form action={addToCart}>
          <button type="submit">カートに入れる</button>
        </form>
      </section>

      <HydrationCheck />
    </>
  );
}
