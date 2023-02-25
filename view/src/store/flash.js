import {defineStore} from "pinia";
import {ref} from "vue";

export const useFlashStore = defineStore("flash", () => {
  const data = ref(null);

  const getData = () => {
    const {value: dataValue} = data;
    data.value = null;
    return dataValue;
  };

  const setData = (value) => {
    data.value = value;
  };

  return {
    getData,
    setData,
  };
});
