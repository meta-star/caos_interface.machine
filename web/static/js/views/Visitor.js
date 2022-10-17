export default {
    name: "visitor",
    methods:{
      back() {
        window.history.length ? this.$router.back() : this.$router.replace("/");
      },
    },
    template: `
    <div>
    <div>
      <button
              class="my-3  hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
              @click="back"
          >
              < Back
          </button>
      </div>
      <div class="flex h-screen justify-center items-center">
        <p class="text-8xl tracking-widest text-gray-500">您目前在訪客模式</p>
      </div>
    </div>  
      `,
  };
  