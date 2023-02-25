<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <button class="my-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="onClickGoBack">
        Back
      </button>
      <div class="flex flex-col break-words bg-white border border-2 rounded shadow-md" v-if="false">
        <div class="flex-auto p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="my-3 text-sm font-bold leading-5 text-gray-900">
                {{ deviceId }}
              </p>
              <p class="my-3 text-sm leading-5 text-gray-500">
                {{ deviceData.features }}
              </p>
              <p class="my-3 text-sm leading-5 text-gray-500">
                Status: {{ deviceData.state.message }}
              </p>
              <button class="my-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                @click="onClickPowerOn">
                ON
              </button>
              <button class="my-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="onClickPowerOff">
                OFF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const deviceId = route.params.id;
const deviceData = ref({});

onMounted(() => {
  freshDevice();
});

function onClickGoBack() {
  router.back();
}

function onClickPowerOn() {
  modifyItem(true)
}

function onClickPowerOff() {
  modifyItem(false)
}

function freshDevice() {
  axios
    .get(`/automate/device/${deviceId}`)
    .then((x) => {
      deviceData.value = x.data;
    })
    .catch((e) => {
      console.error(e);
    });
}

function modifyItem(state) {
  axios
    .put(`/automate/device/${deviceId}`, {
      state,
    })
    .then((x) => {
      console.log(x);
      this.fresh();
    })
    .catch((e) => {
      console.error(e);
    });
}
</script>
