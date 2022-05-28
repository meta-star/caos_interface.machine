const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

export default {
    name: "IndexClock",
    data: () => ({
        datetime: null
    }),
    computed: {
        localeDateClockString() {
            return this.dateToClockString(
                this.datetime.getFullYear(),
                this.datetime.getMonth(),
                this.datetime.getDate(),
                this.datetime.getDay()
            )
        },
        localeTimeClockString() {
            return this.timeToClockString(
                this.datetime.getHours(),
                this.datetime.getMinutes(),
                this.datetime.getSeconds()
            )
        }
    },
    methods: {
        dateToClockString(year, month, date, day) {
            return `西元${year}年${month + 1}月${date}日 ${WEEKDAYS[day]}`;
        },
        timeToClockString(hours, minutes, seconds) {
            const ampm = hours >= 12 ? "下午" : "上午";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            return `${ampm} ${hours}:${minutes}:${seconds}`;
        },
        async clock() {
            while (true) {
                this.datetime = new Date();
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
    },
    created() {
        this.clock();
    },
    template: `
    <div class="w-full">
        <div class="flex bg-white" style="height:100vh;">
            <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
                        現在時間 <span class="text-indigo-600">{{localeTimeClockString}}</span>
                    </h2>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">
                        {{localeDateClockString}}
                    </p>
                    <div class="flex justify-center lg:justify-start mt-6">
                        <button class="px-4 py-3 bg-gray-900 text-gray-200 text-lg font-semibold rounded hover:bg-gray-800" @click="$emit('open-menu')">
                            功能表
                        </button>
                        <button class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-base font-semibold rounded hover:bg-gray-400" @click="$emit('open-menu')">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
                <div class="h-full object-cover" style="background: url(static/images/wallpaper/default.jpg) no-repeat">
                    <div class="h-full bg-black opacity-25"></div>
                </div>
            </div>
        </div>
    </div>
    `,
};
