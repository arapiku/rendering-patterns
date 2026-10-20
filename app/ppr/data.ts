import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { sleep } from "../_lib/sleep";

// 本物の DB の代わりに、JSON ファイルに価格を保存する
const DB_FILE = path.join(process.cwd(), ".data", "price.json");
const INITIAL_PRICE = 1980;

export async function readPrice(): Promise<number> {
  try {
    const json = JSON.parse(await readFile(DB_FILE, "utf8")) as { price: number };
    return json.price;
  } catch {
    return INITIAL_PRICE;
  }
}

export async function savePrice(price: number) {
  await mkdir(path.dirname(DB_FILE), { recursive: true });
  await writeFile(DB_FILE, JSON.stringify({ price }));
}

// 表示用の価格。1時間ごとに作り直す期限付きキャッシュ（ISR）にして、
// 価格を変えたときは "price" タグを消して、期限を待たずに作り直させる。
export async function getPrice() {
  "use cache";
  cacheTag("price");
  cacheLife("hours");

  return { price: await readPrice(), fetchedAt: new Date().toISOString() };
}

// 在庫数は常に変わる想定なので、キャッシュせずリクエストのたびに取得する
export async function getStock() {
  await connection();
  await sleep(1000);
  return {
    stock: Math.floor(Math.random() * 10),
    checkedAt: new Date().toISOString(),
  };
}
