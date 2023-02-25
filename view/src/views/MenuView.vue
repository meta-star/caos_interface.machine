<template>
    <div id="services" class="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
        <div class="container xl:max-w-6xl mx-auto px-4">
            <!-- Heading start -->
            <header class="text-center mx-auto mb-12 lg:px-20">
                <h2 class="text-2xl leading-normal mb-2 font-bold text-black">功能表</h2>
                <p class="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{{ datetime }}</p>
            </header>
            <!-- End heading -->
            <!-- row -->
            <div class="flex flex-wrap flex-row -mx-4 text-center">
                <!-- item block -->
                <menu-item v-for="(i, j) in menuItems" :name="i.name" :description="i.description" :method="i.method"
                    :key="j">
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
import { useRouter } from "vue-router";

import {
    ArrowUturnLeftIcon,
    ChatBubbleLeftEllipsisIcon,
    ClockIcon,
    BoltIcon,
    Cog6ToothIcon,
    InformationCircleIcon,
} from "@heroicons/vue/24/outline";

import MenuItem from '../components/MenuItem.vue';

const router = useRouter();

const menuItems = [
    {
        name: "返回",
        icon: ArrowUturnLeftIcon,
        method: () => router.back()
    },
    {
        name: "Lena 設定",
        icon: ChatBubbleLeftEllipsisIcon,
        method: () => null
    },
    {
        name: "我的鬧鐘",
        icon: ClockIcon,
        method: () => null
    },
    {
        name: "家電控制",
        icon: BoltIcon,
        method: () => router.push("/automate")
    },
    {
        name: "系統設定",
        icon: Cog6ToothIcon,
        method: () => null
    },
    {
        name: "關於系統",
        icon: InformationCircleIcon,
        method: () => router.push('/about')
    }
];
</script>
