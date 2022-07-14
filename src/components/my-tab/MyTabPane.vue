<template>
  <div class="my-tab-pane">
    <slot />
  </div>
</template>

<!-- 这里为了能使子组件使用name属性，让父组件获取，所以用defineComponent，使用setup语法糖获取不到 -->
<script lang="ts">
import { defineComponent, ref, inject } from "vue";
export default defineComponent({
  name: "MyTabPane",
  setup(props, { slots }) {},
});
</script>