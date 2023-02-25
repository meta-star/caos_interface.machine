<template>
    <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow cursor-pointer"
        style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeInUp;" @click="props.method">
        <div
            class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <div class="w-12 inline-block text-gray-900 mb-4">
                <slot name="icon"></slot>
            </div>
            <h3 class="text-lg leading-normal mb-2 font-semibold text-black">{{ props.name }}</h3>
            <p class="text-gray-500" v-if="false">{{ props.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: () => ""
    },
    method: {
        type: Function,
        required: true
    }
});
</script>
