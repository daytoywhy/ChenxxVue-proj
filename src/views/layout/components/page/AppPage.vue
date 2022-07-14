<template>
  <div>
    <section>
      <router-view v-slot="{ Component }">
        <transition appear
                    name="fade-transform"
                    mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
    <footer class="my-footer">
      <div>生前哪管身后事，浪得几日是几日</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.my-footer {
  height: 56px;
  padding: 0 20px 0;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px dashed #dcdfe6;
}
</style>
