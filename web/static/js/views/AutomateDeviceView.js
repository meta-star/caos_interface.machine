export default {
  name: "AutomateDeviceView",
  data: () => ({
    device: null,
  }),
  methods: {
    back() {
      window.history.length ? this.$router.back() : this.$router.replace("/");
    },
    fresh() {
      axios
        .get(`/automate/device/${this.$route.params.id}`)
        .then((x) => {
          this.device = x.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    supply(state) {
      axios
        .put(`/automate/device/${this.$route.params.id}`, {
          state,
        })
        .then((x) => {
          console.log(x);
          this.fresh();
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  created() {
    this.fresh();
  },
  template: `
    <div class="flex justify-center">
        <div class="w-full max-w-md">
            <button
                class="my-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                @click="back"
            >
                Back
            </button>
            <div class="flex flex-col break-words bg-white border border-2 rounded shadow-md" v-if="device">
                  <div class="flex-auto p-6">
                      <div class="flex items-center justify-between">
                          <div>
                            <p class="my-3 text-sm font-bold leading-5 text-gray-900">
                                {{ device._id }}
                            </p>
                            <p class="my-3 text-sm leading-5 text-gray-500">
                                {{ device.features }}
                            </p>
                            <p class="my-3 text-sm leading-5 text-gray-500">
                                Status: {{ device.state.message }}
                            </p>
                            <button
                                class="my-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                @click="supply(true)"
                            >
                                ON
                            </button>
                            <button
                                class="my-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                @click="supply(false)"
                            >
                                OFF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
};
