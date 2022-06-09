export default {
  name: "AutomateDeviceView",
  data: () => ({
    device: null,
  }),
  created() {
    axios
      .get(`/automate/device/${this.$route.params.id}`)
      .then((x) => {
        this.device = x.data;
      })
      .catch((e) => {
        console.error(e);
      });
  },
  template: `
    <div class="flex justify-center">
        <div class="w-full max-w-md" v-if="device">
            <div class="flex flex-col break-words bg-white border border-2 rounded shadow-md">
                  <div class="flex-auto p-6">
                      <div class="flex items-center justify-between">
                          <div>
                            <p class="text-sm font-bold leading-5 text-gray-900">
                                {{ device._id }}
                            </p>
                            <p class="text-sm leading-5 text-gray-500">
                                {{ device.features }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
};
