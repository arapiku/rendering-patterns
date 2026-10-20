// 遅い API や DB の代わりに、わざと待たせる
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
