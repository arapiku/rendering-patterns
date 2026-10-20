"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { readPrice, savePrice } from "./data";

// 管理画面で価格を変えた、という想定。
// DB を更新したら、すぐに "price" タグのキャッシュを消す。
export async function changePrice() {
  await savePrice((await readPrice()) + 100);
  updateTag("price");
}

// カートの中身は Cookie に持つ。ユーザーごとに違うので、共有のキャッシュには入れられない。
export async function addToCart() {
  const cookieStore = await cookies();
  const count = Number(cookieStore.get("cart")?.value ?? "0");
  cookieStore.set("cart", String(count + 1));
}
