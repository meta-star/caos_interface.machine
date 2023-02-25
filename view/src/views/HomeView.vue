<template>
    <div class="w-full">
        <div class="flex bg-white" style="height:100vh;">
            <div v-if="isLoaded" class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
                        現在時間 <span class="text-indigo-600">{{ localeTimeClock }}</span>
                    </h2>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">
                        {{ localeDateClock }}
                    </p>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">
                        氣溫：{{ localeWeatherOnlineTemperature }}°C
                        （{{ localeWeatherName }}）
                    </p>
                    <p class="mt-1 text-sm text-gray-500 md:text-base">
                        室度：{{ localeWeatherOfflineTemperature }}°C
                        濕度：{{ localeWeatherOfflineHumidity }}
                    </p>
                    <div class="flex justify-center lg:justify-start mt-6">
                        <button
                            class="px-4 py-3 bg-gray-900 text-gray-200 text-lg font-semibold rounded hover:bg-gray-800 mr-2"
                            @click="onClickOpenMenu">
                            功能表
                        </button>
                        <button
                            class="w-12 px-4 py-3 bg-gray-300 text-gray-900 text-base font-semibold rounded hover:bg-gray-400"
                            @click="onClickOpenLena">
                            <microphone-icon />
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 class="inline text-3xl font-semibold text-gray-800 md:text-4xl">
                        初始化...
                    </h2>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">
                        全力載入中
                    </p>
                    <div class="flex justify-center lg:justify-start mt-6">
                        <svg class="animate-spin h-8 w-8 text-indigo" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
                <div id="cover-image" class="h-full object-cover">
                    <div class="h-full bg-black opacity-25"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import { MicrophoneIcon } from '@heroicons/vue/24/solid'

const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

const router = useRouter();

const isLoaded = ref(true);

const localeTimeClock = computed(() => {
    return timeToClockString(
        currentClock.value.getHours(),
        currentClock.value.getMinutes(),
        currentClock.value.getSeconds(),
    );
});
const localeDateClock = computed(() => {
    return dateToClockString(
        currentClock.value.getFullYear(),
        currentClock.value.getMonth(),
        currentClock.value.getDate(),
        currentClock.value.getDay(),
    );
});

const localeWeatherName = ref("Unknown");
const localeWeatherOnlineTemperature = ref(0);
const localeWeatherOfflineTemperature = ref(0);
const localeWeatherOfflineHumidity = ref(0);

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

function onClickOpenMenu() {
    router.push("/menu");
}

function onClickOpenLena() {
    router.push("/lena");
}

function timeToClockString(hours, minutes, seconds) {
    const ampm = hours >= 12 ? "下午" : "上午";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${ampm} ${hours}:${minutes}:${seconds}`;
}

function dateToClockString(year, month, date, day) {
    return `西元${year}年${month + 1}月${date}日 ${WEEKDAYS[day]}`;
}
</script>

<style scoped>
#cover-image {
    background: url("wallpaper/default.jpg") no-repeat
}
</style>
