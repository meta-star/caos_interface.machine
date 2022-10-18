import MenuItem from "../components/MenuItem.js";

export default {
    name: "MenuView",
    components: {
        MenuItem,
    },
    data: () => ({
        datetime: null,
    }),
    computed: {
        menu() {
            return [
                {
                    name: "關閉功能表",
                    icon: "close_menu",
                    method: this.back
                },
                {
                    name: "hIE 設定",
                    icon: "chat",
                    method: () => this.$router.push('/visitor')
                },
                {
                    name: "超大時鐘",
                    icon: "clock",
                    method: () => this.$router.push('/alarmclock')
                },
                {
                    name: "家電控制",
                    icon: "power",
                    method: () => this.$router.push("/automate")
                },
                {
                    name: "系統設定",
                    icon: "setting",
                    method: () => this.$router.push('/visitor')
                },
                {
                    name: "關於系統",
                    icon: "about",
                    method: () => this.$router.push('/about')
                }
            ]
        }
    },
    methods: {
        back() {
            window.history.length
                ? this.$router.back()
                : this.$router.replace("/")
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
                <MenuItem
                    v-for="(i, j) in menu"
                    :name="i.name"
                    :icon="i.icon"
                    :description="i.description"
                    :method="i.method"
                 />
                <!-- end item block -->
            </div>
            <!-- end row -->
        </div>
    </div>
    `,
};
