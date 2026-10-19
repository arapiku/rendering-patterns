import { connection } from "next/server";

// CSR のページがブラウザから呼ぶ API。
// connection() で、ビルド時に事前生成せず、リクエストのたびに実行させる。
export async function GET() {
  await connection();
  return Response.json({ now: new Date().toISOString() });
}
