import MenuItem from "../components/MenuItem.js";

export default {
  name: "AutomateView",
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
          method: this.back,
        },
        {
          name: "配對新裝置",
          icon: "add",
          method: () => this.$router.push("/automate/pair"),
        },
      ];
    },
  },
  methods: {
    back() {
      window.history.length ? this.$router.back() : this.$router.replace("/");
    },
    async clock() {
      while (true) {
        this.datetime = new Date();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    },
  },
  created() {
    this.clock();
    axios
      .get("/automate/devices")
      .then((x) => {
        if (!Array.isArray(x.data)) return;
        this.menu.push(
          ...x.data.map((y) => ({
            name: y._id,
            icon: "about",
            method: () => this.$router.push(`/automate/${y._id}`),
          }))
        );
      })
      .catch((e) => {
        console.error(e);
      });
  },
  template: `
  <div id="services" class="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
      <div class="container xl:max-w-6xl mx-auto px-4">
          <!-- Heading start -->
          <header class="text-center mx-auto mb-12 lg:px-20">
              <h2 class="text-2xl leading-normal mb-2 font-bold text-black">家電控制</h2>
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
