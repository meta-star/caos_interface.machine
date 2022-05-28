import IndexClock from "../components/IndexClock.js";
import IndexMenu from "../components/IndexMenu.js";

export default {
  name: "IndexView",
  components: {
    IndexClock,
    IndexMenu,
  },
  template: `
  <div>
    <IndexMenu />
  </div>
  `
};
