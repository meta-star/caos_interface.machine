<template>
  <div id="services" class="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
    <div class="container xl:max-w-6xl mx-auto px-4">
      <!-- Heading start -->
      <header class="text-center mx-auto mb-12 lg:px-20">
        <h2 class="text-2xl leading-normal mb-2 font-bold text-black">家電控制</h2>
        <p class="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{{ titleClock }}</p>
      </header>
      <!-- End heading -->
      <!-- row -->
      <div class="flex flex-wrap flex-row -mx-4 text-center">
        <!-- item block -->
        <menu-item v-for="(i, j) in menuItems" :name="i.name" :description="i.description" :method="i.method" :key="j">
          <template #icon>
            <component :is="i.icon" />
          </template>
        </menu-item>
        <!-- end item block -->
      </div>
      <!-- end row -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import {
  ArrowUturnLeftIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";

import MenuItem from '../components/MenuItem.vue';

const router = useRouter();

const titleClock = computed(() => currentClock.value.toString());

const isClockWorking = ref(true);
const currentClock = ref(null);
(async function clockUpdater() {
  while (isClockWorking.value) {
    currentClock.value = new Date();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
})();
onBeforeUnmount(() => {
  isClockWorking.value = false;
});

const menuItems = [
  {
    name: "返回",
    icon: ArrowUturnLeftIcon,
    method: () => router.back(),
  },
  {
    name: "配對新裝置",
    icon: PlusCircleIcon,
    method: () => router.push("/automate/pair"),
  },
];
</script>