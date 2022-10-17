import TimePick from "./TimePick.js";
export default {
  name: "AlarmList",
  components: {
    TimePick,
  },
  data() {
      return {
      items: [
        {
          title:"test",
          hour:12,
          min:'00',
          apm:'am',
          edit:false
        }
      ],
      taskItem: "",
      isError: false
      };
  },

  methods: {
      addItem(e) {
        let value = e.target.value;
        
        if (value === "") {
            return false;
        }
    
        if (this.itemExist(value) === true) {
            let repeated = [].filter.call(
            document.getElementsByTagName("span"),
            function(span) {
                return span.textContent === value;
            }
            );
            this.isError = true;
            repeated[0].classList.add("bg-orange-300");
            return false;
        }
    
        this.isError = false;
        e.target.value = "";
        this.items.push({
            title: value,
            edit: false
        });
    
        let repeatedClasses = document.querySelectorAll(".bg-orange-300");
        for (let repeatedClass of repeatedClasses) {
            repeatedClass.classList.remove("bg-orange-300");
        }
      },
      removeItem(index) {
        this.items.splice(index, 1);
        this.$refs.addtask.focus();
        },
        enableEdit(index) {
        this.items[index].edit = true;
        this.$nextTick(() => {
            let input = this.$refs.task[0];
            input.focus();
        });
      },
      disableEdit(index){
        this.items[index].edit = false;
        },
      itemExist(value) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].title === value) {
            return true;
            }
        }
      
          return false;
      },
      changehour(e,index) {
          this.items[index].hour= String(e.target.value);
          console.log(e.target.value);
      },
      changemin(e,index) {
          this.items[index].min= String(e.target.value);
          console.log(e.target.value);
      },
      changeapm(e,index) {
        this.items[index].apm=String(e.target.value);
        console.log(e.target.value,index);
        console.log("aaaaa");
        console.log(this.items);
    },
  },
      
  template:`
  
  <div id="app" v-cloak class="container mx-auto flex items-center flex-col mt-10">
  <header class="text-center pb-10">
    <h1 class="text-5xl font-black">鬧鐘</h1>
  </header>

  <main class="mt-3">
    <label for="">
      <input id="add_item" type="text" placeholder="新增事項" autofocus ref="addtask"
             class="bg-gray-200 focus:bg-white border-black border-solid border-2 px-2 py-1 w-full mb-4 hover:bg-white"
             @keyup.enter="addItem" />
    </label>

    <ul class="max-w-xs ml-8">
      <li v-for="(item, index) in items" class="ml-5 my-4 flex items-center justify-end">
        <span v-if="! item.edit" class="truncate px-2 py-1 mr-2 max-w-20 border-transparent border-solid border-2 hover:border-black" @click="enableEdit(index)">{{ item.title }}</span>
        <input v-else type="text" v-model="item.title" :ref="'task'" @keyup.enter="disableEdit(index)" @blur="disableEdit(index)" class="px-2 py-1 mr-2 w-20 border-black border-transparent focus:border-black border-solid border-2 focus:bg-white">
        <span class="mr-2">
        <TimePick
            :name="item.min"
            :index="index"
            :changehour="changehour"
            :changemin="changemin"
            :changeapm="changeapm"
        />
        </span>
        <button class="px-2 py-1 mr-2" @click="removeItem(index)">
          <img alt="delete" width="40px" height="40px" src="/static/images/icons/trash.svg" class="hover:stroke-blue-200 focus:stroke-blue-200">
        </button>
      </li>
    </ul>

    <p class="error px-2 py-1 rounded" v-if="isError">☝This task already exists.</p>
  </main>


  <!-- <pre>{{ $data }}</pre> -->
</div>
    `



}