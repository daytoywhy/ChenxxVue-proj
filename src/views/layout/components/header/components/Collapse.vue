<template>
  <div class="collapse-demo"
       @click="toggleSidebar">
    <svg :class="['collapse-icon',{'is-active':opened}]"
         viewBox="0 0 1024 1024"
         width="64"
         height="64"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352 192 160-192 128V352z"></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store/modules/setting";
import { storeToRefs } from "pinia";
const settingStore = useSettingStore();
const { opened } = storeToRefs(settingStore);
const { toggleSidebar } = settingStore;
</script>
