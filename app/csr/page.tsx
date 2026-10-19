import { HydrationCheck } from "../_components/hydration-check";
import { ClientClock } from "./client-clock";

export default function Page() {
  return (
    <>
      <h1>CSR（Client-Side Rendering）</h1>
      <p>
        中身はブラウザで JS が描画します。サーバーから届く HTML には、時刻が入っていません。
      </p>
      <ClientClock />
      <HydrationCheck />
    </>
  );
}
