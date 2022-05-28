import IndexClock from "../components/IndexClock.js";
import IndexMenu from "../components/IndexMenu.js";

export default {
  name: "IndexView",
  components: {
    IndexClock,
    IndexMenu,
  },
  data: () => ({
    show_menu: false
  }),
  template: `
  <div>
    <IndexClock @open-menu="show_menu=true" v-if="!show_menu" />
    <IndexMenu @close-menu="show_menu=false" v-else />
  </div>
  `
};
