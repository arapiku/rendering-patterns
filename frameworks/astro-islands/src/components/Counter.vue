<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{ label: string }>();

const count = ref(0);
const hydrated = ref(false);

// onMounted はブラウザでしか動かないので、ハイドレーションされた部品だけが「完了」になる
onMounted(() => {
  hydrated.value = true;
});
</script>

<template>
  <dl>
    <dt>{{ label }}</dt>
    <dd>ハイドレーション: {{ hydrated ? "完了" : "未完了" }}</dd>
    <dd>
      <button type="button" @click="count++">押した回数: {{ count }}</button>
    </dd>
  </dl>
</template>
