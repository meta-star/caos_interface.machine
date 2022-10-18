import Clock from "../components/Clock.js";
import AlarmList from "../components/AlarmList.js";
export default {
  name: "AlarmClock",
  components: {
    Clock,
  },
  methods: {
    back() {
      window.history.length ? this.$router.back() : this.$router.replace("/");
    },
  },
  data() {
    return {
      items: [
        {
          title: "HTML5",
          edit: false
        },
        {
          title: "CSS3",
          edit: false
        },
        {
          title: "JavaScript",
          edit: false
        }
      ],
      taskItem: "",
      isError: false
    };
  },
  template: `
  <div>
    <div class="flex-start flex-col">
      <button
          class="my-3  whitespace-nowrap hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
          @click="back">
          < Back
      </button>
    </div>
    <div class="flex items-center content-center w-full align-middle" style="height:100vh;">
      <div class="flex justify-center w-full">
          <Clock/>
      </div>
    </div>
  </div>
  `

}