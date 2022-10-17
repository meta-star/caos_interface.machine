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
          x.data.state = x.data.state || {};
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
  <div class="flex flex-col justify-center align-center">
  <div>
      <button
          class="my-3  hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
          @click="back"
      >
          < Back
      </button>
  </div>
  <div class="w-full flex justify-center items-center">
      <div class="min-w-fit w-1/4 flex items-center break-words bg-white border border-2 rounded shadow-md" v-if="device">
            <div class="flex-auto p-6 justify-center">
                <div class="flex items-center justify-center">
                    <div class="tracking-widest flex flex-col justify-evenly ">
                      <p class="my-3 text-xl leading-5 text-gray-900">caOS_ID:</p>
                      <p class="my-3 text-xl font-bold leading-5 text-gray-500">
                         {{ device._id }}
                      </p>
                      <p class="my-3 text-xl leading-5 text-gray-900">裝置:</p>
                      <p class="my-3 text-xl leading-5 text-gray-500">
                          {{ device.features }}
                      </p>
                      <p class="my-3 text-xl leading-5 text-gray-900"> 狀態: </p>
                      <p class="my-3 text-xl leading-5 text-gray-500">
                          {{ device.state.message }}
                      </p>
                      <p class="my-3 text-xl leading-5 text-gray-900">
                          調整：
                      </p>
                      <div class="flex justify-center"> 
                          <button
                          class="my-3 w-20 bg-white text-black border shadow-md hover:bg-green-700 hover:text-white font-bold py-2 px-4 rounded mr-8 "
                          @click="supply(true)"
                          >
                              ON
                          </button>
                          <button
                              class="my-3 w-20 bg-white text-black border shadow-md hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded"
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
</div>
    `,
};
